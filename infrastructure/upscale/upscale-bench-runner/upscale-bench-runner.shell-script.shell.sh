#!/usr/bin/env bash
set -uo pipefail

MODEL_DIR=/app/ComfyUI/models/SEEDVR2
IN_DIR=/app/ComfyUI/input
OUT_DIR=/app/ComfyUI/output
mkdir -p "$MODEL_DIR" "$IN_DIR" "$OUT_DIR"

DIT_MODEL="${UPSCALE_DIT_MODEL:-seedvr2_ema_7b_fp8_e4m3fn_mixed_block35_fp16.safetensors}"
VAE_MODEL="ema_vae_fp16.safetensors"
BLOCKS_TO_SWAP="${UPSCALE_BLOCKS_TO_SWAP:-24}"
RESOLUTION="${UPSCALE_RES:-1460}"
SEED="${UPSCALE_SEED:-12345}"
IN_NAME="${UPSCALE_IN:-closeup-a.png}"
OUT_NAME="${UPSCALE_OUT:-closeup-3080ti-cu121.png}"
S3_BUCKET="${S3_BUCKET:-upscale-14565}"

python - "$S3_BUCKET" "$IN_NAME" "$IN_DIR" <<'PY' || { echo "FATAL: S3 input pull failed"; exit 1; }
import os, sys, boto3
from botocore.config import Config
bucket, in_name, in_dir = sys.argv[1], sys.argv[2], sys.argv[3]
s3 = boto3.client("s3", endpoint_url=os.environ["SEAWEEDFS_S3_ENDPOINT"],
    aws_access_key_id=os.environ["SEAWEEDFS_ACCESS_KEY"],
    aws_secret_access_key=os.environ["SEAWEEDFS_SECRET_KEY"],
    config=Config(signature_version="s3v4", s3={"addressing_style":"path"}))
dst = os.path.join(in_dir, in_name)
s3.download_file(bucket, f"inputs/{in_name}", dst)
print(f"[s3] pulled inputs/{in_name} -> {dst} ({os.path.getsize(dst)} B)", flush=True)
PY

export HF_HUB_DISABLE_XET=1
python - "$MODEL_DIR" "$DIT_MODEL" "$VAE_MODEL" <<'PY' || { echo "FATAL: HF weight provision failed"; exit 1; }
import os, sys, shutil
from huggingface_hub import hf_hub_download
mdir, dit, vae = sys.argv[1], sys.argv[2], sys.argv[3]
FILES = [("AInVFX/SeedVR2_comfyUI", dit), ("numz/SeedVR2_comfyUI", vae)]
tmp = os.path.join(mdir, ".hf-tmp")
for repo, fn in FILES:
    dst = os.path.join(mdir, fn)
    if os.path.exists(dst) and os.path.getsize(dst) > 1_000_000:
        print(f"[hf] skip {fn} ({os.path.getsize(dst)} B)", flush=True); continue
    print(f"[hf] download {fn} <- {repo}", flush=True)
    p = hf_hub_download(repo_id=repo, filename=fn, local_dir=tmp)
    os.replace(p, dst)
shutil.rmtree(tmp, ignore_errors=True)
print("[hf] weights ready", flush=True)
PY

echo "=== GPU ==="; nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader

PEAK_FILE=/tmp/peak_vram_mib
echo 0 > "$PEAK_FILE"
( peak=0
  while true; do
    u=$(nvidia-smi --query-gpu=memory.used --format=csv,noheader,nounits 2>/dev/null | head -1 | tr -dc '0-9')
    [ -n "$u" ] && [ "$u" -gt "$peak" ] && { peak=$u; echo "$peak" > "$PEAK_FILE"; }
    sleep 0.2
  done ) &
POLLER=$!

OUT_HOST="$OUT_DIR/$OUT_NAME"
rm -f "$OUT_HOST"
echo "==> SeedVR2 v2.5: $IN_NAME -> $OUT_NAME (short-side ${RESOLUTION}px, seed ${SEED}, bts=${BLOCKS_TO_SWAP})"
T0=$(date +%s.%N)
python \
  /app/ComfyUI/custom_nodes/ComfyUI-SeedVR2_VideoUpscaler/inference_cli.py \
  "$IN_DIR/$IN_NAME" \
  --dit_model "$DIT_MODEL" \
  --model_dir "$MODEL_DIR" \
  --resolution "$RESOLUTION" \
  --color_correction lab \
  --seed "$SEED" \
  --blocks_to_swap "$BLOCKS_TO_SWAP" \
  --dit_offload_device cpu \
  --vae_encode_tiled \
  --vae_decode_tiled \
  --attention_mode sdpa \
  --output_format png \
  --output "$OUT_HOST"
RC=$?
T1=$(date +%s.%N)
kill "$POLLER" 2>/dev/null
ELAPSED=$(python -c "print(f'{${T1}-${T0}:.2f}')")
PEAK=$(cat "$PEAK_FILE")

echo "=== RESULT ==="
echo "cli_exit=$RC (untrusted — CLI swallows OOM and exits 0)"
echo "wall_seconds=$ELAPSED"
echo "peak_vram_mib=$PEAK"

if [ ! -f "$OUT_HOST" ] || [ "$(stat -c%s "$OUT_HOST" 2>/dev/null || echo 0)" -lt 1000 ]; then
  echo "VERDICT: FAIL — output missing/tiny (likely OOM at bts=${BLOCKS_TO_SWAP}; raise UPSCALE_BLOCKS_TO_SWAP)"
  exit 3
fi
OUT_SIZE=$(stat -c%s "$OUT_HOST")
echo "VERDICT: OK — $OUT_HOST ($OUT_SIZE B) in ${ELAPSED}s, peak ${PEAK} MiB"

python - "$S3_BUCKET" "$OUT_HOST" "$OUT_NAME" "$ELAPSED" "$PEAK" "$BLOCKS_TO_SWAP" "$OUT_SIZE" <<'PY'
import os, sys, json, boto3
from botocore.config import Config
bucket, out_host, out_name, elapsed, peak, bts, size = sys.argv[1:8]
s3 = boto3.client("s3", endpoint_url=os.environ["SEAWEEDFS_S3_ENDPOINT"],
    aws_access_key_id=os.environ["SEAWEEDFS_ACCESS_KEY"],
    aws_secret_access_key=os.environ["SEAWEEDFS_SECRET_KEY"],
    config=Config(signature_version="s3v4", s3={"addressing_style":"path"}))
s3.upload_file(out_host, bucket, f"outputs/{out_name}")
result = {"wall_seconds": float(elapsed), "peak_vram_mib": int(peak),
          "blocks_to_swap": int(bts), "out_bytes": int(size), "out_name": out_name}
s3.put_object(Bucket=bucket, Key=f"results/{out_name}.json", Body=json.dumps(result).encode())
print(f"[s3] pushed outputs/{out_name} + results/{out_name}.json", flush=True)
PY
echo "DONE"

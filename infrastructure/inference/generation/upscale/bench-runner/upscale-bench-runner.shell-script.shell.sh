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
IN_SLUG="${UPSCALE_IN_SLUG:?names the image page this job reads}"
IN_NAME="in.png"
OUT_NAME="out.png"

python - "$IN_SLUG" "$IN_DIR/$IN_NAME" <<'PY' || { echo "FATAL: page input pull failed"; exit 1; }
import os, sys, json, urllib.request
slug, dst = sys.argv[1], sys.argv[2]
origin = os.environ["PAGES_SERVICE_ORIGIN"].rstrip("/")
asked = json.dumps({"pageTypeSlug": "image", "slug": slug, "key": "bytes"}).encode()
kind = "application" + "/" + "json"
req = urllib.request.Request(origin + "/file", data=asked, headers={"content-type": kind})
with urllib.request.urlopen(req, timeout=120) as answered:
    held = answered.read()
with open(dst, "wb") as out:
    out.write(held)
print(f"[pages] pulled {slug} -> {dst} ({len(held)} B)", flush=True)
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

python - "$OUT_HOST" <<'PY' || { echo "FATAL: page output landing failed"; exit 1; }
import os, sys, json, base64, hashlib, urllib.request
out_host = sys.argv[1]
origin = os.environ["PAGES_SERVICE_ORIGIN"].rstrip("/")
with open(out_host, "rb") as held:
    made = held.read()
slug = "image-" + hashlib.sha256(made).hexdigest()[:16]
kind = "application" + "/" + "json"

def posted(at, body):
    req = urllib.request.Request(
        origin + at, data=json.dumps(body).encode(), headers={"content-type": kind}
    )
    with urllib.request.urlopen(req, timeout=180) as answered:
        said = json.loads(answered.read())
    if isinstance(said, dict) and isinstance(said.get("refused"), str):
        raise SystemExit(f"the pages refused {at}: {said['refused']}")
    return said

held = posted("/read", {"pages": [{"pageTypeSlug": "image", "slug": slug}]})
if not held.get("bodies"):
    posted("/write", {
        "writer": "upscale-job <upscale-job@alanwalton.com>",
        "message": f"land the image {slug}",
        "pages": [{"pageTypeSlug": "image", "slug": slug, "values": {}, "fresh": True}],
    })
posted("/place", {
    "pageTypeSlug": "image",
    "slug": slug,
    "key": "bytes",
    "ending": "png",
    "bytes": base64.b64encode(made).decode(),
})
print(f"[pages] landed {slug} ({len(made)} B)", flush=True)
print(f"UPSCALE_OUT_SLUG={slug}", flush=True)
PY
echo "DONE"

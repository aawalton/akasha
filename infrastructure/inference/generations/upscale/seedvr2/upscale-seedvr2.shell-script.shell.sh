#!/usr/bin/env bash
set -euo pipefail

CONTAINER="${UPSCALE_CONTAINER:-upscale}"
DATA="${UPSCALE_HOME:-$HOME/.local/share/upscale}"
DIT_MODEL="${UPSCALE_DIT_MODEL:-seedvr2_ema_7b_fp8_e4m3fn_mixed_block35_fp16.safetensors}"
BLOCKS_TO_SWAP="${UPSCALE_BLOCKS_TO_SWAP:-24}"

if [ "$#" -lt 2 ]; then
  echo "usage: upscale-seedvr2 <input-name> <output-name> [resolution] [seed]" >&2
  exit 2
fi
IN_NAME="$1"
OUT_NAME="$2"
RESOLUTION="${3:-1460}"
SEED="${4:-12345}"

if ! podman container exists "$CONTAINER" || \
   [ "$(podman inspect -f '{{.State.Running}}' "$CONTAINER" 2>/dev/null)" != "true" ]; then
  echo "ERROR: container '$CONTAINER' is not running. Start it: shell-script/upscale-up" >&2
  exit 1
fi

OUT_HOST="$DATA/outputs/$OUT_NAME"
BEFORE_SIZE=0
[ -f "$OUT_HOST" ] && BEFORE_SIZE="$(stat -c%s "$OUT_HOST" 2>/dev/null || echo 0)"

echo "==> SeedVR2 v2.5: $IN_NAME -> $OUT_NAME  (short-side ${RESOLUTION}px, seed ${SEED})"
podman exec "$CONTAINER" python \
  /app/ComfyUI/custom_nodes/ComfyUI-SeedVR2_VideoUpscaler/inference_cli.py \
  "/app/ComfyUI/input/$IN_NAME" \
  --dit_model "$DIT_MODEL" \
  --model_dir /app/ComfyUI/models/SEEDVR2 \
  --resolution "$RESOLUTION" \
  --color_correction lab \
  --seed "$SEED" \
  --blocks_to_swap "$BLOCKS_TO_SWAP" \
  --dit_offload_device cpu \
  --vae_encode_tiled \
  --vae_decode_tiled \
  --attention_mode sdpa \
  --output_format png \
  --output "/app/ComfyUI/output/$OUT_NAME"

if [ ! -f "$OUT_HOST" ]; then
  echo "ERROR: SeedVR2 reported success but $OUT_HOST does not exist (likely OOM" >&2
  echo "       swallowed by the CLI). Raise UPSCALE_BLOCKS_TO_SWAP and retry." >&2
  exit 1
fi
AFTER_SIZE="$(stat -c%s "$OUT_HOST" 2>/dev/null || echo 0)"
if [ "$AFTER_SIZE" -le "$BEFORE_SIZE" ] || [ "$AFTER_SIZE" -lt 1000 ]; then
  echo "ERROR: output $OUT_HOST did not grow (before=$BEFORE_SIZE after=$AFTER_SIZE)." >&2
  exit 1
fi
echo "==> OK: $OUT_HOST ($AFTER_SIZE bytes)"

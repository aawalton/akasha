#!/usr/bin/env bash
set -euo pipefail

DATA="${UPSCALE_HOME:-$HOME/.local/share/upscale}"
PORT="${UPSCALE_PORT:-8677}"
BASE="http://127.0.0.1:${PORT}"
PKG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ "$#" -lt 2 ]; then
  echo "usage: upscale-srpo <clean-image-path> <output-prefix> [denoise] [guidance]" >&2
  exit 2
fi
SRC="$1"
PREFIX="$2"
DENOISE="${3:-0.18}"
GUIDANCE="${4:-3.5}"

if [ ! -f "$SRC" ]; then
  echo "ERROR: source image not found: $SRC" >&2
  exit 1
fi
for f in models/unet/srpo-Q6_K.gguf models/text_encoders/t5xxl_fp8_e4m3fn.safetensors \
         models/text_encoders/clip_l.safetensors models/vae/ae.safetensors; do
  if [ ! -f "$DATA/$f" ]; then
    echo "ERROR: SRPO model missing: $DATA/$f — run shell-script/upscale-provision srpo" >&2
    exit 1
  fi
done
if ! curl -sf "$BASE/system_stats" >/dev/null 2>&1; then
  echo "ERROR: ComfyUI daemon not reachable at $BASE — start it: shell-script/upscale-up" >&2
  exit 1
fi

IMG_NAME="_srpo_in_$(basename "$SRC")"
cp -f "$SRC" "$DATA/inputs/$IMG_NAME"

read -r W H < <(identify -format "%w %h\n" "$SRC")
echo "==> SRPO refine: $(basename "$SRC")  (${W}x${H}, denoise=${DENOISE}, guidance=${GUIDANCE})"

shopt -s nullglob
before=("$DATA"/outputs/"${PREFIX}"_*.png)
BEFORE_N=${#before[@]}

python3 "$PKG_DIR/upscale-srpo-graph/upscale-srpo-graph.python-module.python.py" \
  --base "$BASE" --image "$IMG_NAME" --prefix "$PREFIX" \
  --width "$W" --height "$H" --denoise "$DENOISE" --guidance "$GUIDANCE"

after=("$DATA"/outputs/"${PREFIX}"_*.png)
if [ "${#after[@]}" -le "$BEFORE_N" ]; then
  echo "ERROR: no new SRPO output '${PREFIX}_*.png' appeared under $DATA/outputs" >&2
  rm -f "$DATA/inputs/$IMG_NAME"
  exit 1
fi
newest="${after[0]}"
for candidate in "${after[@]}"; do
  if [ "$candidate" -nt "$newest" ]; then
    newest="$candidate"
  fi
done
rm -f "$DATA/inputs/$IMG_NAME"
echo "==> OK: $newest"

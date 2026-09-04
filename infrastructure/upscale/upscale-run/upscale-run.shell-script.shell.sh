#!/usr/bin/env bash
set -euo pipefail

PKG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATA="${UPSCALE_HOME:-$HOME/.local/share/upscale}"

if [ "$#" -lt 2 ]; then
  echo "usage: upscale-run <input-name> <base-name> [resolution] [--srpo|--no-srpo]" >&2
  exit 2
fi
IN_NAME="$1"; BASE="$2"; shift 2
RESOLUTION=1460
SRPO_MODE=auto
for arg in "$@"; do
  case "$arg" in
    --srpo) SRPO_MODE=force ;;
    --no-srpo) SRPO_MODE=off ;;
    ''|*[!0-9]*) echo "ERROR: unknown arg '$arg'" >&2; exit 2 ;;
    *) RESOLUTION="$arg" ;;
  esac
done

CLEAN_NAME="${BASE}-seedvr2-v25-clean.png"
bash "$PKG_DIR/upscale-seedvr2/upscale-seedvr2.shell-script.shell.sh" "$IN_NAME" "$CLEAN_NAME" "$RESOLUTION"

run_srpo=0
if [ "$SRPO_MODE" = force ]; then
  run_srpo=1
elif [ "$SRPO_MODE" = auto ] && [ -f "$DATA/models/unet/srpo-Q6_K.gguf" ]; then
  run_srpo=1
fi

if [ "$run_srpo" = 1 ]; then
  bash "$PKG_DIR/upscale-srpo/upscale-srpo.shell-script.shell.sh" "$DATA/outputs/$CLEAN_NAME" "${BASE}-seedvr2-v25-srpo"
else
  echo "==> stage 2 (SRPO) skipped (mode=$SRPO_MODE)."
fi
echo "==> done: $BASE"

#!/bin/bash
set -euo pipefail

NAME="$1"
PYVER="$2"
SVC_DIR="$3"
CONDA_SH="$4"

ENV="inference-${NAME}"
ACE_STEP_REPO="https://github.com/ace-step/ACE-Step-1.5.git"
ACE_STEP_SHA="dce621408bee8c31b4fcf4811682eb9359e1bc94"

CLONE_DIR="$SVC_DIR/ACE-Step-1.5"
CKPT_DIR="$CLONE_DIR/checkpoints"

# shellcheck disable=SC1090
source "$CONDA_SH"

echo "[${NAME}] conda env ${ENV} (python ${PYVER})"
if ! conda env list | awk '{print $1}' | grep -qx "$ENV"; then
  conda create -n "$ENV" -y "python=${PYVER}"
fi
conda activate "$ENV"

python -m pip install --upgrade pip

echo "[${NAME}] clone ACE-Step-1.5 @ ${ACE_STEP_SHA}"
if [ ! -d "$CLONE_DIR/.git" ] && [ ! -f "$CLONE_DIR/.git" ]; then
  git clone "$ACE_STEP_REPO" "$CLONE_DIR"
fi
git -C "$CLONE_DIR" fetch --quiet origin "$ACE_STEP_SHA"
git -C "$CLONE_DIR" checkout --quiet "$ACE_STEP_SHA"

echo "[${NAME}] pip install -e . (pulls mlx + mlx-lm on arm64 darwin)"
( cd "$CLONE_DIR" && python -m pip install -e . )

echo "[${NAME}] pre-download main model into ${CKPT_DIR} (~12 GB)"
python - "$CKPT_DIR" <<'PY'
import sys
from acestep.model_downloader import download_main_model

ok, msg = download_main_model(checkpoints_dir=sys.argv[1])
print(msg)
sys.exit(0 if ok else 1)
PY

echo "[${NAME}] provisioning complete"

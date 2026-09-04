#!/bin/bash
set -euo pipefail

NAME="$1"
PYVER="$2"
CONDA_SH="$4"

ENV="inference-${NAME}"
REMBG_VERSION="2.0.67"
ONNXRUNTIME_VERSION="1.22.0"
FASTAPI_VERSION="0.118.0"
UVICORN_VERSION="0.34.0"
MULTIPART_VERSION="0.0.20"
DEFAULT_MODEL="birefnet-portrait"

# shellcheck disable=SC1090
source "$CONDA_SH"

echo "[${NAME}] conda env ${ENV} (python ${PYVER})"
if ! conda env list | awk '{print $1}' | grep -qx "$ENV"; then
  conda create -n "$ENV" -y "python=${PYVER}"
fi
conda activate "$ENV"

python -m pip install --upgrade pip
echo "[${NAME}] rembg ${REMBG_VERSION} + onnxruntime ${ONNXRUNTIME_VERSION} (BiRefNet matting) + fastapi/uvicorn"
python -m pip install "rembg==${REMBG_VERSION}" "onnxruntime==${ONNXRUNTIME_VERSION}" "fastapi==${FASTAPI_VERSION}" "uvicorn==${UVICORN_VERSION}" "python-multipart==${MULTIPART_VERSION}"

echo "[${NAME}] pre-download BiRefNet weights (${DEFAULT_MODEL})"
python - "$DEFAULT_MODEL" <<'PYEOF'
import sys
from rembg import new_session

new_session(sys.argv[1])
print(f"[segment-rembg] {sys.argv[1]} session ready")
PYEOF

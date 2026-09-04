#!/bin/bash
set -euo pipefail

NAME="$1"
PYVER="$2"
CONDA_SH="$4"

ENV="inference-${NAME}"
MLX_VLM_VERSION="0.6.3"
MLX_VERSION="0.31.2"
MODEL="mlx-community/Qwen3-VL-30B-A3B-Instruct-4bit"

# shellcheck disable=SC1090
source "$CONDA_SH"

echo "[${NAME}] conda env ${ENV} (python ${PYVER})"
if ! conda env list | awk '{print $1}' | grep -qx "$ENV"; then
  conda create -n "$ENV" -y "python=${PYVER}"
fi
conda activate "$ENV"

python -m pip install --upgrade pip
echo "[${NAME}] mlx-vlm ${MLX_VLM_VERSION}"
python -m pip install "mlx-vlm==${MLX_VLM_VERSION}"
echo "[${NAME}] pin mlx==${MLX_VERSION} (mlx-vlm 0.6.3 needs >=0.31.2)"
python -m pip install "mlx==${MLX_VERSION}" "mlx-metal==${MLX_VERSION}"

echo "[${NAME}] pre-download ${MODEL} (~18 GB, 4-bit MoE)"
python -c "from huggingface_hub import snapshot_download; snapshot_download('${MODEL}')"

echo "[${NAME}] provisioning complete"

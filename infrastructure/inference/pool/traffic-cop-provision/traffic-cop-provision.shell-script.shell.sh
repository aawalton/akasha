#!/bin/bash
set -euo pipefail

NAME="$1"
PYVER="$2"
CONDA_SH="$4"

ENV="inference-${NAME}"

# shellcheck disable=SC1090
source "$CONDA_SH"

echo "[${NAME}] conda env ${ENV} (python ${PYVER})"
if ! conda env list | awk '{print $1}' | grep -qx "$ENV"; then
  conda create -n "$ENV" -y "python=${PYVER}"
fi
conda install -n "$ENV" -y -c conda-forge bun

echo "[${NAME}] provisioning complete"

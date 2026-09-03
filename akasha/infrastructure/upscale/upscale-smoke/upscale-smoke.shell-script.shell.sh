#!/usr/bin/env bash
set -euo pipefail

IMAGE="${UPSCALE_IMAGE:-upscale:local}"

if ! command -v podman >/dev/null 2>&1; then
  echo "ERROR: podman not found on PATH." >&2
  exit 1
fi
if ! podman image exists "$IMAGE"; then
  echo "ERROR: image $IMAGE not built. Run shell-script/upscale-up first." >&2
  exit 1
fi

echo "==> [1/3] nvidia-smi inside the container"
podman run --rm --device nvidia.com/gpu=all "$IMAGE" nvidia-smi

echo "==> [2/3] torch CUDA / sm_120 kernel check"
podman run --rm -i --device nvidia.com/gpu=all "$IMAGE" python - <<'PY'
import torch
print("torch", torch.__version__, "| cuda", torch.version.cuda)
assert torch.cuda.is_available(), "torch.cuda.is_available() is False"
name = torch.cuda.get_device_name(0)
cap = torch.cuda.get_device_capability(0)
print("device:", name, "| capability:", cap)
assert cap == (12, 0), f"expected sm_120 (12, 0), got {cap}"
# Exercise an actual sm_120 kernel — fails on a non-Blackwell torch build.
x = torch.randn(1024, 1024, device="cuda")
y = (x @ x).sum().item()
torch.cuda.synchronize()
print("cuda matmul ok, checksum finite:", torch.isfinite(torch.tensor(y)).item())
print("TORCH GPU CHECK: PASS")
PY

echo "==> [3/3] ComfyUI core + GGUF + SeedVR2 + person-mask node presence"
podman run --rm -i --device nvidia.com/gpu=all "$IMAGE" python - <<'PY'
import importlib
import os
import sys

os.chdir("/app/ComfyUI")
sys.path.insert(0, "/app/ComfyUI")
sys.path.insert(0, "/app/ComfyUI/custom_nodes")

import torch, einops, safetensors  # noqa: F401
import comfy.utils  # noqa: F401
print("comfy core import ok")

loader = importlib.import_module("ComfyUI-GGUF.loader")
assert hasattr(loader, "gguf_sd_loader"), "GGUF loader module missing gguf_sd_loader"
print("ComfyUI-GGUF loader import ok")

seedvr2 = "/app/ComfyUI/custom_nodes/ComfyUI-SeedVR2_VideoUpscaler"
assert os.path.isdir(seedvr2), "SeedVR2 node dir missing"
print("SeedVR2 node present")

mask = "/app/ComfyUI/custom_nodes/a-person-mask-generator"
assert os.path.isdir(mask), "a-person-mask-generator dir missing"
print("person-mask node present")
print("UPSCALE IMPORT CHECK: PASS")
PY

echo "==> SMOKE PASS"

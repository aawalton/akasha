#!/usr/bin/env bash
set -euo pipefail

IMAGE="${ZIMAGE_IMAGE:-zimage:local}"

if ! command -v podman >/dev/null 2>&1; then
  echo "ERROR: podman not found on PATH." >&2
  exit 1
fi
if ! podman image exists "$IMAGE"; then
  echo "ERROR: image $IMAGE not built. Run shell-script/zimage-up first." >&2
  exit 1
fi

echo "==> [1/2] nvidia-smi inside the container"
podman run --rm --device nvidia.com/gpu=all "$IMAGE" nvidia-smi

echo "==> [2/2] torch CUDA / sm_120 kernel check"
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

echo "==> SMOKE PASS"

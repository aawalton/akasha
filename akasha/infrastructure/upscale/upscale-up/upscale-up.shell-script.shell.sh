#!/usr/bin/env bash
set -euo pipefail

PKG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

IMAGE="${UPSCALE_IMAGE:-upscale:local}"
CONTAINER="${UPSCALE_CONTAINER:-upscale}"
PORT="${UPSCALE_PORT:-8677}"
DATA="${UPSCALE_HOME:-$HOME/.local/share/upscale}"

if ! command -v podman >/dev/null 2>&1; then
  echo "ERROR: podman not found on PATH." >&2
  exit 1
fi

if command -v getsebool >/dev/null 2>&1; then
  if [ "$(getsebool container_use_devices 2>/dev/null | awk '{print $3}')" != "on" ]; then
    echo "ERROR: SELinux boolean 'container_use_devices' is off — GPU access will fail" >&2
    echo "       with 'Failed to initialize NVML: Insufficient Permissions'." >&2
    echo "       Apply the one-time host fix, also set by the workstation provisioner:" >&2
    echo "         sudo setsebool -P container_use_devices on" >&2
    exit 1
  fi
fi

mkdir -p "$DATA/cache" "$DATA/models" "$DATA/inputs" "$DATA/outputs"

if ! podman image exists "$IMAGE"; then
  echo "==> Building $IMAGE…"
  podman build -t "$IMAGE" -f "$PKG_DIR/upscale-image/Containerfile" "$PKG_DIR"
fi

if podman container exists "$CONTAINER"; then
  if [ "$(podman inspect -f '{{.State.Running}}' "$CONTAINER" 2>/dev/null)" = "true" ]; then
    echo "==> $CONTAINER already running. ComfyUI: http://localhost:$PORT"
    exit 0
  fi
  podman rm "$CONTAINER" >/dev/null
fi

echo "==> Starting $CONTAINER with GPU access…"
podman run -d \
  --init \
  --name "$CONTAINER" \
  --device nvidia.com/gpu=all \
  -p "127.0.0.1:$PORT:8677" \
  -v "$DATA/cache:/root/.cache:z" \
  -v "$DATA/models:/app/ComfyUI/models:z" \
  -v "$DATA/inputs:/app/ComfyUI/input:z" \
  -v "$DATA/outputs:/app/ComfyUI/output:z" \
  "$IMAGE" >/dev/null

echo "==> Started. ComfyUI: http://localhost:$PORT"
echo "    Data dir: $DATA  |  Verify the GPU path: shell-script/upscale-smoke"

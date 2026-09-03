#!/usr/bin/env bash
set -euo pipefail

AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"
PKG_DIR="${AKASHA_ROOT}/akasha/infrastructure/voice-inference"
BUILDKIT_ADDR="tcp://buildkit.buildkit.svc.cluster.local:1234"
REGISTRY="registry.registry.svc.cluster.local:5000"
IMAGE="${REGISTRY}/cluster/voice-infer-cu121:serving"
CACHE="${REGISTRY}/cluster/voice-infer-cu121:buildcache"
BUILDKIT_VERSION="v0.28.0"

BUILDCTL="$(command -v buildctl || true)"
if [ -z "$BUILDCTL" ]; then
  TOOLS="$(mktemp -d)"
  trap 'rm -rf "$TOOLS"' EXIT
  url="https://github.com/moby/buildkit/releases/download/${BUILDKIT_VERSION}/buildkit-${BUILDKIT_VERSION}.linux-amd64.tar.gz"
  echo "[publish] buildctl not found — fetching ${BUILDKIT_VERSION} to ${TOOLS}"
  wget -qO "$TOOLS/buildkit.tar.gz" "$url"
  tar xzf "$TOOLS/buildkit.tar.gz" -C "$TOOLS" bin/buildctl
  BUILDCTL="$TOOLS/bin/buildctl"
  chmod +x "$BUILDCTL"
fi

echo "[publish] building ${IMAGE} from ${PKG_DIR}/voice-infer-image/Containerfile via ${BUILDKIT_ADDR}"
"$BUILDCTL" \
  --addr "$BUILDKIT_ADDR" \
  build \
  --progress=plain \
  --frontend dockerfile.v0 \
  --local "context=${PKG_DIR}" \
  --local "dockerfile=${PKG_DIR}/voice-infer-image" \
  --opt filename=Containerfile \
  --export-cache "type=registry,ref=${CACHE},mode=min,compression=zstd,registry.insecure=true" \
  --import-cache "type=registry,ref=${CACHE},registry.insecure=true" \
  --output "type=image,name=${IMAGE},push=true,registry.insecure=true"

echo "[publish] pushed ${IMAGE}"

#!/usr/bin/env bash
set -euo pipefail

CONTAINER="${WAN_CONTAINER:-wan}"

if ! command -v podman >/dev/null 2>&1; then
  echo "ERROR: podman not found on PATH." >&2
  exit 1
fi

if podman container exists "$CONTAINER"; then
  echo "==> Stopping and removing $CONTAINER…"
  podman rm -f "$CONTAINER" >/dev/null
  echo "==> Removed. Volumes preserved."
else
  echo "==> $CONTAINER is not present. Nothing to do."
fi

#!/bin/bash
set -euo pipefail

NAME="$1"
PYVER="$2"
SVC_DIR="$3"
CONDA_SH="$4"

ENV="inference-${NAME}"
OLLAMA_VER="v0.30.5"
DIST="${SVC_DIR}/dist"
BIN="${DIST}/ollama"
MODELS="${SVC_DIR}/models"
VERSION_SENTINEL="${DIST}/.ollama-version"
PROV_HOST="127.0.0.1:11949"

# shellcheck disable=SC1090
source "$CONDA_SH"

echo "[ollama] conda env ${ENV} (python ${PYVER}, toolchain placeholder)"
if ! conda env list | awk '{print $1}' | grep -qx "$ENV"; then
  conda create -n "$ENV" -y "python=${PYVER}"
fi

echo "[ollama] official darwin binary ${OLLAMA_VER} (Metal)"
mkdir -p "$DIST" "$MODELS"
if [ ! -x "$BIN" ] || [ "$(cat "$VERSION_SENTINEL" 2>/dev/null || echo none)" != "$OLLAMA_VER" ]; then
  TGZ="$(mktemp -t ollama-darwin.XXXXXX.tgz)"
  curl -fsSL -o "$TGZ" "https://github.com/ollama/ollama/releases/download/${OLLAMA_VER}/ollama-darwin.tgz"
  rm -rf "$DIST"
  mkdir -p "$DIST"
  tar -xzf "$TGZ" -C "$DIST"
  rm -f "$TGZ"
  echo "$OLLAMA_VER" > "$VERSION_SENTINEL"
fi
if [ ! -x "$BIN" ]; then
  echo "[ollama] expected binary not found at ${BIN} after extract" >&2
  exit 1
fi

echo "[ollama] pre-pull models (ephemeral provisioning daemon on ${PROV_HOST})"
export OLLAMA_HOST="$PROV_HOST"
export OLLAMA_MODELS="$MODELS"
"$BIN" serve > "${SVC_DIR}/logs/provision.log" 2>&1 &
SERVE_PID=$!
trap 'kill "$SERVE_PID" 2>/dev/null || true; wait "$SERVE_PID" 2>/dev/null || true' EXIT

ready=
for _ in $(seq 1 60); do
  if curl -fsS "http://${PROV_HOST}/api/version" > /dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 1
done
if [ -z "$ready" ]; then
  echo "[ollama] provisioning daemon did not become ready on ${PROV_HOST}" >&2
  exit 1
fi

echo "[ollama] pull Cydonia-24B-v4.3 (NSFW, Q5_K_M)"
"$BIN" pull hf.co/TheDrummer/Cydonia-24B-v4.3-GGUF:Q5_K_M

echo "[ollama] provisioning complete"

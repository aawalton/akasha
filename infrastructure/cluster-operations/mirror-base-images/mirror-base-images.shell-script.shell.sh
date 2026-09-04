#!/usr/bin/env bash

set -euo pipefail

AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"
# shellcheck disable=SC1091
. "${AKASHA_ROOT}/service-system/cluster-services/pages/registry/registry.conf"

LOCAL_REGISTRY="${CONTAINER_REGISTRY}"

DOCKER_HUB_IMAGES=(
  "oven/bun:1.3-alpine"
  "oven/bun:1.3.14-alpine"
  "oven/bun:1.3.14-debian"
  "alpine:3.21"
  "debian:bookworm-slim"
  "postgres:17.4-alpine"
)

KUBECTL_DIGEST="bitnami/kubectl@sha256:6e2cdb22d6ab7264ea198c717f555e30536b54029d26c8781b9f25f78951b564"
KUBECTL_LOCAL_TAG="bitnami/kubectl:sha256-6e2cdb22d6ab"

MCR_IMAGES=(
  "mcr.microsoft.com/playwright:v1.61.1-noble"
)

for image in "${DOCKER_HUB_IMAGES[@]}"; do
  echo "--- Mirroring ${image} ---"
  docker pull "${image}"
  docker tag "${image}" "${LOCAL_REGISTRY}/${image}"
  docker push "${LOCAL_REGISTRY}/${image}"
done

echo "--- Mirroring ${KUBECTL_DIGEST} ---"
docker pull "${KUBECTL_DIGEST}"
docker tag "${KUBECTL_DIGEST}" "${LOCAL_REGISTRY}/${KUBECTL_LOCAL_TAG}"
docker push "${LOCAL_REGISTRY}/${KUBECTL_LOCAL_TAG}"

for image in "${MCR_IMAGES[@]}"; do
  local_name="${image#mcr.microsoft.com/}"
  echo "--- Mirroring ${image} ---"
  docker pull "${image}"
  docker tag "${image}" "${LOCAL_REGISTRY}/${local_name}"
  docker push "${LOCAL_REGISTRY}/${local_name}"
done

echo "All base images mirrored to ${LOCAL_REGISTRY}."

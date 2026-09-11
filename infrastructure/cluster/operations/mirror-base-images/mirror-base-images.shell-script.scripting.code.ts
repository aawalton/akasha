import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { upFrom } from "akasha/utils/narrow/up-from/up-from.module.code.ts"

const SCRIPT = "shell-script"

const OWN = "mirror-base-images"

const ROOTS = "repo-roots"

const SHELL = "shell"

export function rootsShellIn(given: string | Reading): string {
  return fileOf(given, valuedAt(given, SCRIPT, ROOTS), SCRIPT, SHELL)
}

function upToRoot(given: string | Reading): string {
  return upFrom(valuedAt(given, SCRIPT, OWN).path)
}

function opening(given: string | Reading): readonly string[] {
  return [
    "#!/usr/bin/env bash",
    "",
    "set -euo pipefail",
    "",
    'HERE="$(cd -- "$(dirname -- "$(readlink -f -- "$0")")" && pwd -P)"',
    `REPO="$(cd -- "$HERE/${upToRoot(given)}" && pwd -P)"`,
    `. "$REPO/${rootsShellIn(given)}"`,
    "",
    'LOCAL_REGISTRY="registry.registry.svc.cluster.local:5000"',
    "",
    "DOCKER_HUB_IMAGES=(",
    '  "oven/bun:1.3-alpine"',
    '  "oven/bun:1.3.14-alpine"',
    '  "oven/bun:1.3.14-debian"',
    '  "alpine:3.21"',
    '  "debian:bookworm-slim"',
    '  "postgres:17.4-alpine"',
    ")",
    "",
    'KUBECTL_DIGEST="bitnami/kubectl@sha256:6e2cdb22d6ab7264ea198c717f555e30536b54029d26c8781b9f25f78951b564"',
    'KUBECTL_LOCAL_TAG="bitnami/kubectl:sha256-6e2cdb22d6ab"',
    "",
  ]
}

function pinning(): readonly string[] {
  return [
    'PLAYWRIGHT_MANIFEST="$AKASHA_ROOT/package.json"',
    "PLAYWRIGHT_VERSION=\"$(jq -r '",
    "  [.dependencies, .devDependencies, .optionalDependencies]",
    '  | map(.["playwright-core"] // empty)',
    "  | first // empty",
    '\' "$PLAYWRIGHT_MANIFEST")"',
    'if [[ ! "$PLAYWRIGHT_VERSION" =~ ^[0-9]+\\.[0-9]+\\.[0-9]+$ ]]; then',
    "  printf 'mirror-base-images: %s pins playwright-core at \"%s\", which is no exact version\\n' \\",
    '    "$PLAYWRIGHT_MANIFEST" "$PLAYWRIGHT_VERSION" >&2',
    "  exit 1",
    "fi",
    "",
    "MCR_IMAGES=(",
    '  "mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble"',
    ")",
    "",
  ]
}

function mirroring(): readonly string[] {
  return [
    'for image in "${DOCKER_HUB_IMAGES[@]}"; do',
    '  echo "--- Mirroring ${image} ---"',
    '  docker pull "${image}"',
    '  docker tag "${image}" "${LOCAL_REGISTRY}/${image}"',
    '  docker push "${LOCAL_REGISTRY}/${image}"',
    "done",
    "",
    'echo "--- Mirroring ${KUBECTL_DIGEST} ---"',
    'docker pull "${KUBECTL_DIGEST}"',
    'docker tag "${KUBECTL_DIGEST}" "${LOCAL_REGISTRY}/${KUBECTL_LOCAL_TAG}"',
    'docker push "${LOCAL_REGISTRY}/${KUBECTL_LOCAL_TAG}"',
    "",
    'for image in "${MCR_IMAGES[@]}"; do',
    '  local_name="${image#mcr.microsoft.com/}"',
    '  echo "--- Mirroring ${image} ---"',
    '  docker pull "${image}"',
    '  docker tag "${image}" "${LOCAL_REGISTRY}/${local_name}"',
    '  docker push "${LOCAL_REGISTRY}/${local_name}"',
    "done",
    "",
    'echo "All base images mirrored to ${LOCAL_REGISTRY}."',
  ]
}

export function bodyIn(given: string | Reading): string {
  const lines = [...opening(given), ...pinning(), ...mirroring()]
  return `${lines.join("\n")}\n`
}

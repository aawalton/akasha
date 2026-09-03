import { CI_TOOLCHAIN_URLS } from "../toolchain-manifest/toolchain-manifest.module.code.ts"

export const EXPECTED_TOOLCHAIN_BINARIES: readonly string[] = [
  "git",
  "curl",
  "flock",
  "bun",
  "bunx",
  "kubectl",
  "sops",
  "jq",
  "envsubst",
  "shellcheck",
  "buildctl",
  "ast-grep",
  "lua5.1",
  "promtool",
]

export function buildToolchainProvisionScript(): readonly string[] {
  return [
    "set -e",
    'echo "[provision] installing benchmark toolchain into $TOOLS (untimed)"',
    "export DEBIAN_FRONTEND=noninteractive",
    "apt-get update -qq",
    "apt-get install -y -qq --no-install-recommends xz-utils unzip ca-certificates util-linux lua5.1 >/dev/null",
    'mkdir -p "$TOOLS" "$TOOLS/git-core" "$TOOLS/ssl"',
    'ln -sfn "$(command -v git)" "$TOOLS/git"',
    'for f in "$(git --exec-path)"/*; do ln -sfn "$f" "$TOOLS/git-core/$(basename "$f")"; done',
    'ln -sfn /etc/ssl/certs/ca-certificates.crt "$TOOLS/ssl/ca-certificates.crt"',
    'ln -sfn "$(command -v lua5.1)" "$TOOLS/lua5.1"',
    `wget -qO "$TOOLS/kubectl" "${CI_TOOLCHAIN_URLS.kubectl}" && chmod +x "$TOOLS/kubectl"`,
    `wget -qO "$TOOLS/sops" "${CI_TOOLCHAIN_URLS.sops}" && chmod +x "$TOOLS/sops"`,
    `wget -qO "$TOOLS/jq" "${CI_TOOLCHAIN_URLS.jq}" && chmod +x "$TOOLS/jq"`,
    `wget -qO "$TOOLS/envsubst" "${CI_TOOLCHAIN_URLS.envsubst}" && chmod +x "$TOOLS/envsubst"`,
    `wget -qO /tmp/shellcheck.tar.xz "${CI_TOOLCHAIN_URLS.shellcheckTarXz}"`,
    "tar xf /tmp/shellcheck.tar.xz -C /tmp",
    'cp /tmp/shellcheck-*/shellcheck "$TOOLS/shellcheck" && chmod +x "$TOOLS/shellcheck"',
    `wget -qO /tmp/buildkit.tar.gz "${CI_TOOLCHAIN_URLS.buildkitTarGz}"`,
    "tar xzf /tmp/buildkit.tar.gz -C /tmp bin/buildctl",
    'cp /tmp/bin/buildctl "$TOOLS/buildctl" && chmod +x "$TOOLS/buildctl"',
    `wget -qO /tmp/bun.zip "${CI_TOOLCHAIN_URLS.bunZip}"`,
    "unzip -qo /tmp/bun.zip -d /tmp",
    'cp /tmp/bun-linux-x64-baseline/bun "$TOOLS/bun" && chmod +x "$TOOLS/bun"',
    `wget -qO /tmp/ast-grep.zip "${CI_TOOLCHAIN_URLS.astGrepZip}"`,
    "unzip -qo /tmp/ast-grep.zip ast-grep -d /tmp",
    'cp /tmp/ast-grep "$TOOLS/ast-grep" && chmod +x "$TOOLS/ast-grep"',
    `wget -qO /tmp/prometheus.tar.gz "${CI_TOOLCHAIN_URLS.promtoolTarGz}"`,
    "tar xzf /tmp/prometheus.tar.gz -C /tmp --strip-components=1 prometheus-2.54.1.linux-amd64/promtool",
    'cp /tmp/promtool "$TOOLS/promtool" && chmod +x "$TOOLS/promtool"',
    'ln -sf bun "$TOOLS/bunx"',
    'ln -sf bun "$TOOLS/node"',
    `for b in ${EXPECTED_TOOLCHAIN_BINARIES.join(" ")} node; do ln -sfn "$TOOLS/$b" "/usr/local/bin/$b"; done`,
    'echo "[provision] toolchain staged"',
  ]
}

export function buildToolchainVerifyScript(): readonly string[] {
  return [
    'echo "[verify] probing benchmark toolchain"',
    "benchmark_missing=''",
    `for b in ${EXPECTED_TOOLCHAIN_BINARIES.join(" ")}; do`,
    '  if ! command -v "$b" >/dev/null 2>&1; then',
    '    echo "ERROR: benchmark toolchain missing binary: $b" >&2',
    '    benchmark_missing="$benchmark_missing $b"',
    "  fi",
    "done",
    'if [ -n "$benchmark_missing" ]; then',
    '  echo "ERROR: benchmark toolchain incomplete —$benchmark_missing (aborting before any timed phase)" >&2',
    "  exit 1",
    "fi",
    'echo "[verify] toolchain complete"',
  ]
}

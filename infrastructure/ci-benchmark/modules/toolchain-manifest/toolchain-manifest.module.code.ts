export const CI_TOOLCHAIN_URLS = {
  kubectl: "https://dl.k8s.io/release/v1.32.0/bin/linux/amd64/kubectl",
  sops: "https://github.com/getsops/sops/releases/download/v3.9.4/sops-v3.9.4.linux.amd64",
  jq: "https://github.com/jqlang/jq/releases/download/jq-1.7.1/jq-linux-amd64",
  envsubst: "https://github.com/a8m/envsubst/releases/download/v1.4.2/envsubst-Linux-x86_64",
  shellcheckTarXz:
    "https://github.com/koalaman/shellcheck/releases/download/v0.10.0/shellcheck-v0.10.0.linux.x86_64.tar.xz",
  buildkitTarGz:
    "https://github.com/moby/buildkit/releases/download/v0.28.0/buildkit-v0.28.0.linux-amd64.tar.gz",
  bunZip: "https://github.com/oven-sh/bun/releases/download/bun-v1.3.14/bun-linux-x64-baseline.zip",
  astGrepZip:
    "https://github.com/ast-grep/ast-grep/releases/download/0.38.7/app-x86_64-unknown-linux-gnu.zip",
  promtoolTarGz:
    "https://github.com/prometheus/prometheus/releases/download/v2.54.1/prometheus-2.54.1.linux-amd64.tar.gz",
} as const

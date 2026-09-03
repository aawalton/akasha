import { IMAGES } from "@akasha/workflow-language/images"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"
import type { Step } from "@akasha/workflow-language/workflow-types"
import { routedCheckCommand } from "../../../../../tools/lib/check-workflow/run-check-routing.ts"

const CI_TOOLCHAIN_URLS = {
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

const PREP_PROVISION_STEPS: readonly Step[] = [
  step({
    name: "preparation-provision-ci-shell",
    image: IMAGES.ALPINE,
    volumes: ["ci-storage:/ci-storage"],
    backendOptions: { kubernetes: { runAsUser: 0 } },
    commands: [
      "set -e",
      'SHELL_VERSION="v3"',
      '[ -f /ci-storage/tools/.shell-version ] && [ "$(cat /ci-storage/tools/.shell-version)" = "$SHELL_VERSION" ] && echo "[skip] ci-shell $SHELL_VERSION already provisioned" && exit 0',
      "rm -f /ci-storage/tools/.shell-version || exit 1",
      "apk add --no-cache bash xz || exit 1",
      "mkdir -p /ci-storage/tools || exit 1",
      'install_atomic() { cp "$1" "$2.tmp.$$" || exit 1; if [ -n "${3:-}" ]; then chmod "$3" "$2.tmp.$$" || exit 1; fi; mv -f "$2.tmp.$$" "$2" || exit 1; }',
      'write_atomic() { cat > "$1.tmp.$$" || exit 1; if [ -n "${2:-}" ]; then chmod "$2" "$1.tmp.$$" || exit 1; fi; mv -f "$1.tmp.$$" "$1" || exit 1; }',
      "install_atomic /bin/busybox /ci-storage/tools/busybox",
      "install_atomic /lib/ld-musl-x86_64.so.1 /ci-storage/tools/ld-musl-x86_64.so.1",
      "install_atomic /bin/bash /ci-storage/tools/bash.bin",
      "install_atomic /usr/lib/libreadline.so.8 /ci-storage/tools/libreadline.so.8",
      "install_atomic /usr/lib/libncursesw.so.6 /ci-storage/tools/libncursesw.so.6",
      "install_atomic /usr/bin/xz /ci-storage/tools/xz.bin",
      "install_atomic /usr/lib/liblzma.so.5 /ci-storage/tools/liblzma.so.5",
      "printf '#!/bin/sh\\nLD_LIBRARY_PATH=/ci-storage/tools exec /ci-storage/tools/ld-musl-x86_64.so.1 /ci-storage/tools/bash.bin \"$@\"\\n' | write_atomic /ci-storage/tools/bash +x",
      "printf '#!/bin/sh\\nLD_LIBRARY_PATH=/ci-storage/tools exec /ci-storage/tools/ld-musl-x86_64.so.1 /ci-storage/tools/xz.bin \"$@\"\\n' | write_atomic /ci-storage/tools/xz +x",
      'echo "$SHELL_VERSION" | write_atomic /ci-storage/tools/.shell-version',
      'echo "[ok] ci-shell $SHELL_VERSION provisioned"',
    ],
  }),

  {
    ...step({
      name: "preparation-provision-ci-toolchain",
      image: IMAGES.BUILDPACK_DEPS,
      volumes: ["ci-storage:/ci-storage"],
      backendOptions: {
        kubernetes: {
          runAsUser: 0,
          resources: { requests: { memory: "2Gi" }, limits: { memory: "2Gi" } },
        },
      },
      commands: [
        "set -e",
        'TOOLS_VERSION="v18"',
        '[ -f /ci-storage/tools/.version ] && [ "$(cat /ci-storage/tools/.version)" = "$TOOLS_VERSION" ] && echo "[skip] ci-toolchain $TOOLS_VERSION already provisioned" && exit 0',
        "rm -f /ci-storage/tools/.version",
        "",
        'install_atomic() { cp "$1" "$2.tmp.$$" || exit 1; if [ -n "${3:-}" ]; then chmod "$3" "$2.tmp.$$" || exit 1; fi; mv -f "$2.tmp.$$" "$2" || exit 1; }',
        'write_atomic() { cat > "$1.tmp.$$" || exit 1; if [ -n "${2:-}" ]; then chmod "$2" "$1.tmp.$$" || exit 1; fi; mv -f "$1.tmp.$$" "$1" || exit 1; }',
        'wget_atomic() { wget -qO "$1.tmp.$$" "$2" || exit 1; if [ -n "${3:-}" ]; then chmod "$3" "$1.tmp.$$" || exit 1; fi; mv -f "$1.tmp.$$" "$1" || exit 1; }',
        "",
        "# xz comes from /ci-storage/tools/ (provisioned by ci-shell step from",
        "# alpine main; needed for shellcheck.tar.xz). unzip comes from busybox.",
        'BB_UNZIP="/ci-storage/tools/ld-musl-x86_64.so.1 /ci-storage/tools/busybox unzip"',
        "",
        "mkdir -p /ci-storage/tools/lib /ci-storage/tools/git-core /ci-storage/tools/ssl /tmp/staging",
        "",
        "# Helper: copy a binary and all its shared lib dependencies via atomic install.",
        "# Optional 2nd arg overrides the destination path (used for lua5.1 to lay the",
        "# binary directly at lua5.1.bin without an intermediate rename — two concurrent",
        "# pipelines doing place-then-rename-then-write-wrapper could interleave such",
        "# that the wrapper ends up renamed to .bin).",
        'copy_with_libs() { local src="$1"; local dst="${2:-/ci-storage/tools/$(basename "$src")}"; install_atomic "$src" "$dst" +x; ldd "$src" 2>/dev/null | grep "=>" | awk \'{print $3}\' | while read -r lib; do [ -f "$lib" ] && install_atomic "$lib" "/ci-storage/tools/lib/$(basename "$lib")"; done; }',
        "",
        "# Fetch lua5.1 via apt-get download-only + dpkg-deb extract.",
        "# Two seccomp-related blockers the pod profile imposes:",
        "#   1. apt's http method drops privileges to the _apt user (setgroups",
        "#      / setuid blocked) — APT::Sandbox::User=root keeps apt as root.",
        "#   2. dpkg's normal install path calls setgid/setuid for ownership",
        "#      management — likewise blocked. Skip dpkg's configuration phase",
        "#      entirely by extracting the .deb with dpkg-deb -x (a tarball",
        "#      extract that doesn't touch UIDs).",
        "DEBIAN_FRONTEND=noninteractive apt-get -o APT::Sandbox::User=root update",
        "DEBIAN_FRONTEND=noninteractive apt-get -o APT::Sandbox::User=root -o Debug::NoLocking=true install -y --no-install-recommends --download-only lua5.1",
        "mkdir -p /tmp/lua-extract",
        "dpkg-deb -x /var/cache/apt/archives/lua5.1_*.deb /tmp/lua-extract",
        "",
        "# Glibc-linked tools from the image",
        "copy_with_libs /usr/bin/git",
        "copy_with_libs /usr/bin/curl",
        "",
        "# lua5.1 needs liblua5.1.so.0 from the .deb at runtime — that lib",
        "# isn't in debian:bookworm-slim's /usr/lib, so PATH-injected calls",
        "# fail to load it. Wrap with a launcher that sets LD_LIBRARY_PATH",
        "# (same pattern as the bash wrapper).",
        "copy_with_libs /tmp/lua-extract/usr/bin/lua5.1 /ci-storage/tools/lua5.1.bin",
        'for lib in /tmp/lua-extract/usr/lib/x86_64-linux-gnu/liblua5.1.so.0*; do [ -f "$lib" ] && install_atomic "$lib" "/ci-storage/tools/lib/$(basename "$lib")"; done',
        "printf '#!/bin/sh\\nexec env LD_LIBRARY_PATH=/ci-storage/tools/lib:${LD_LIBRARY_PATH} /ci-storage/tools/lua5.1.bin \"$@\"\\n' | write_atomic /ci-storage/tools/lua5.1 +x",
        "",
        "# Git subcommands (git-remote-https, etc.)",
        'for src in /usr/lib/git-core/*; do [ -f "$src" ] && install_atomic "$src" "/ci-storage/tools/git-core/$(basename "$src")" +x; done',
        'for bin in /ci-storage/tools/git-core/git-remote-*; do ldd "$bin" 2>/dev/null | grep "=>" | awk \'{print $3}\' | while read -r lib; do [ -f "$lib" ] && install_atomic "$lib" "/ci-storage/tools/lib/$(basename "$lib")"; done; done',
        "",
        "# CA certificates for HTTPS",
        "install_atomic /etc/ssl/certs/ca-certificates.crt /ci-storage/tools/ssl/ca-certificates.crt",
        "",
        "# Download static/self-contained binaries in parallel. wget_atomic for",
        "# /ci-storage destinations (concurrent overwrite would ETXTBSY); plain",
        "# wget for /tmp destinations (no cross-pod concurrent reads on /tmp).",
        "(",
        `  wget_atomic /ci-storage/tools/kubectl "${CI_TOOLCHAIN_URLS.kubectl}" +x &`,
        `  wget_atomic /ci-storage/tools/sops "${CI_TOOLCHAIN_URLS.sops}" +x &`,
        `  wget_atomic /ci-storage/tools/jq "${CI_TOOLCHAIN_URLS.jq}" +x &`,
        `  wget -qO /tmp/shellcheck.tar.xz "${CI_TOOLCHAIN_URLS.shellcheckTarXz}" &`,
        `  wget -qO /tmp/buildkit.tar.gz "${CI_TOOLCHAIN_URLS.buildkitTarGz}" &`,
        `  wget -qO /tmp/bun.zip "${CI_TOOLCHAIN_URLS.bunZip}" &`,
        `  wget -qO /tmp/ast-grep.zip "${CI_TOOLCHAIN_URLS.astGrepZip}" &`,
        `  wget_atomic /ci-storage/tools/envsubst "${CI_TOOLCHAIN_URLS.envsubst}" +x &`,
        `  wget -qO /tmp/prometheus.tar.gz "${CI_TOOLCHAIN_URLS.promtoolTarGz}" &`,
        "  wait",
        ")",
        "",
        "# Extract archives into /tmp/staging then atomic-install into tools/.",
        "/ci-storage/tools/xz -d /tmp/shellcheck.tar.xz",
        "tar xf /tmp/shellcheck.tar -C /tmp/staging --strip-components=1 shellcheck-v0.10.0/shellcheck",
        "install_atomic /tmp/staging/shellcheck /ci-storage/tools/shellcheck +x",
        "tar xzf /tmp/buildkit.tar.gz -C /tmp/staging --strip-components=1 bin/buildctl",
        "install_atomic /tmp/staging/buildctl /ci-storage/tools/buildctl +x",
        "$BB_UNZIP -qo /tmp/bun.zip -d /tmp",
        "install_atomic /tmp/bun-linux-x64-baseline/bun /ci-storage/tools/bun +x",
        "$BB_UNZIP -qo /tmp/ast-grep.zip ast-grep -d /tmp/staging",
        "install_atomic /tmp/staging/ast-grep /ci-storage/tools/ast-grep +x",
        "tar xzf /tmp/prometheus.tar.gz -C /tmp/staging --strip-components=1 prometheus-2.54.1.linux-amd64/promtool",
        "install_atomic /tmp/staging/promtool /ci-storage/tools/promtool +x",
        "",
        "# Symlinks (ln -sf is a directory-entry change — no ETXTBSY exposure):",
        "# bunx → bun, node → bun (biome shim uses #!/usr/bin/env node).",
        "ln -sf bun /ci-storage/tools/bunx",
        "ln -sf bun /ci-storage/tools/node",
        "",
        "# Write version sentinel atomically (last step — visible to other pods only after rename).",
        'echo "$TOOLS_VERSION" | write_atomic /ci-storage/tools/.version',
        'echo "[ok] ci-toolchain $TOOLS_VERSION provisioned"',
      ],
    }),
    dependsOn: ["preparation-provision-ci-shell"],
  },
]

const PREP_CONTENT_CACHE_STEPS: readonly Step[] = [
  {
    ...step({
      name: "preparation-build-graph",
      image: IMAGES.BUN_GIT,
      alwaysRun: true,
      backendOptions: {
        kubernetes: {
          resources: { requests: { cpu: "1", memory: "2Gi" }, limits: { memory: "4Gi" } },
        },
      },
      commands: (ci) => [
        "set -e",
        routedCheckCommand({
          cwd: `/ci-storage/checkouts/${ci.commitSha}`,
          script: "tools/commands/graph/build.ts",
          args: ["--tree-sha", ci.treeSha],
        }),
      ],
    }),
    dependsOn: ["preparation-prep", "preparation-synth-k8s"],
  },
]

function installDepsCommands(commitSha: string): readonly string[] {
  return [
    "mkdir -p /ci-storage/bun-cache /ci-storage/tmp",
    `INSTALL_DIR=/ci-storage/installs/${commitSha}`,
    "if [ -f $INSTALL_DIR/.install-done ]; then",
    `  echo "Reusing installed dependencies (commit ${commitSha})"`,
    "else",
    `  echo "Installing dependencies (commit ${commitSha})..."`,
    "  mkdir -p $INSTALL_DIR",
    '  rm -rf "$WS/node_modules" 2>/dev/null || true',
    '  cd "$WS" && bun install --frozen-lockfile || exit 1',
    '  mv "$WS/node_modules" $INSTALL_DIR/node_modules || exit 1',

    "  for link in $(find $INSTALL_DIR/node_modules -maxdepth 3 -type l); do",
    '    target=$(readlink "$link")',
    '    case "$target" in ../*) ;; *) continue ;; esac',
    '    rel="${link#$INSTALL_DIR/node_modules/}"',
    '    abs=$(realpath -m "$WS/node_modules/$(dirname "$rel")/$target")',
    '    [ -d "$abs" ] && ln -sfn "$abs" "$link"',
    "  done",
    "  touch $INSTALL_DIR/.install-done",
    "fi",

    'if [ ! -L "$WS/node_modules" ]; then',
    '  rm -rf "$WS/node_modules" 2>/dev/null || true',
    '  ln -s $INSTALL_DIR/node_modules "$WS/node_modules" || exit 1',
    "fi",

    'for cfg in $(find "$WS" -name vite.config.ts -not -path "*/node_modules/*"); do',
    '  mkdir -p "$(dirname "$cfg")/node_modules" || exit 1',
    "done",
  ]
}

const PREP_SELFHEAL_LOG_PREFIX = "SELF-HEAL (#15219)"

const PREP_SELFHEAL_SH_FUNCTIONS = `# ── prep bare-repo self-heal (#15219) ──
# prep_local_odb_damaged <repo> <fetch_stderr_file>
# exit 0 => the LOCAL object store is damaged and the repo must be re-cloned.
# exit 1 => NOT local damage (healthy repo, a transient transport error, or the
#           #9479 placeholder-OID race) — the caller must NOT quarantine.
prep_local_odb_damaged() {
  _repo=$1
  _errf=$2
  # Primary, network-free: a connectivity fsck fails only on a genuinely
  # missing/broken object in the EXISTING store. A transport failure or the
  # #9479 race leaves the store intact, so fsck passes and we fall through.
  if [ -d "$_repo" ] && ! git -C "$_repo" fsck --connectivity-only --no-progress >/dev/null 2>&1; then
    return 0
  fi
  [ -f "$_errf" ] || return 1
  # Secondary (defense in depth) — for the case where the missing objects are
  # referenced only by the incoming fetch's deltas, not by an existing ref, so
  # fsck of the current store still passes. Transport / auth / #9479-race
  # signatures are matched FIRST and win (return 1: do NOT quarantine).
  if grep -qiE 'did not send all necessary objects|bad object worktrees/|could not resolve host|connection (refused|timed out|reset)|unable to access|the remote end hung up|early eof|rpc failed|http/[0-9.]+ 5[0-9][0-9]|could not read username|authentication failed|remote error' "$_errf"; then
    return 1
  fi
  # Confirmed local-ODB-damage signatures.
  if grep -qiE 'unpack-objects failed|unresolved deltas|could not read [0-9a-f]{7,40}|object file .* is empty|loose object .* is corrupt|(packfile|pack) .*(corrupt|cannot be accessed)|missing (blob|tree|commit)|bad (tree|object) [0-9a-f]{7,40}|inflate: data stream error|failed to run repack|failed to traverse parents' "$_errf"; then
    return 0
  fi
  return 1
}

# prep_quarantine_and_reinit <repo>
# Rename a corrupt bare repo to a timestamped sibling (forensics preserved) and
# re-init a fresh one under the held flock. Bounds quarantine disk and logs
# every quarantine/prune loudly (No Silent Caps).
prep_quarantine_and_reinit() {
  _repo=$1
  _parent=$(dirname "$_repo")
  _base=$(basename "$_repo")
  _maxage=\${PREP_QUARANTINE_MAX_AGE_DAYS:-3}
  _maxkeep=\${PREP_QUARANTINE_MAX_KEEP:-3}
  [ "$_maxkeep" -ge 1 ] 2>/dev/null || _maxkeep=1
  # Prune quarantines older than the age bound.
  find "$_parent" -maxdepth 1 -type d -name "$_base.corrupt-*" -mtime +"$_maxage" 2>/dev/null | while IFS= read -r _d; do
    echo "${PREP_SELFHEAL_LOG_PREFIX}: pruning aged quarantine $_d (>\${_maxage}d)" >&2
    rm -rf "$_d"
  done
  # Enforce the count bound BEFORE creating the new one: keep the newest
  # (_maxkeep - 1) so the total after re-init is at most _maxkeep. Names are
  # UTC-timestamped, so a reverse lexical sort is newest-first.
  _keep=$((_maxkeep - 1))
  find "$_parent" -maxdepth 1 -type d -name "$_base.corrupt-*" 2>/dev/null | sort -r | while IFS= read -r _d; do
    _keep=$((_keep - 1))
    if [ "$_keep" -lt 0 ]; then
      echo "${PREP_SELFHEAL_LOG_PREFIX}: pruning surplus quarantine $_d (keep newest \${_maxkeep})" >&2
      rm -rf "$_d"
    fi
  done
  _ts=$(date -u +%Y%m%dT%H%M%SZ)-$$
  _dest="$_parent/$_base.corrupt-$_ts"
  echo "${PREP_SELFHEAL_LOG_PREFIX}: LOCAL ODB CORRUPTION in $_repo — quarantining to $_dest and re-initializing a fresh bare repo. fsck output follows:" >&2
  git -C "$_repo" fsck --connectivity-only 2>&1 | sed 's/^/${PREP_SELFHEAL_LOG_PREFIX} fsck: /' >&2 || true
  if ! mv "$_repo" "$_dest"; then
    echo "${PREP_SELFHEAL_LOG_PREFIX}: FATAL — could not quarantine $_repo to $_dest" >&2
    return 1
  fi
  touch "$_dest" 2>/dev/null || true
  git init --bare "$_repo" || return 1
  # Preserve the #14446 sole-gc-authority invariant on the fresh repo: disable
  # auto-gc so ephemeral step pods can't auto-gc and orphan a mid-repack (the
  # corruption writer this whole feature exists to recover from).
  git -C "$_repo" config gc.auto 0 || true
  echo "${PREP_SELFHEAL_LOG_PREFIX}: fresh bare repo initialized at $_repo (quarantine preserved at $_dest)" >&2
}`

function prepFetchWithSelfHeal(fetchCmd: string, repo = "/ci-storage/repo"): readonly string[] {
  return [
    `  if ! ${fetchCmd} 2>"$PREP_FETCH_ERR"; then`,
    `    cat "$PREP_FETCH_ERR" >&2`,
    `    if prep_local_odb_damaged "${repo}" "$PREP_FETCH_ERR"; then`,
    `      prep_quarantine_and_reinit "${repo}" || exit 1`,
    `      ${fetchCmd} || { echo "${PREP_SELFHEAL_LOG_PREFIX}: re-fetch after re-clone FAILED" >&2; exit 1; }`,
    `    else`,
    `      echo "${PREP_SELFHEAL_LOG_PREFIX}: fetch failed but local ODB intact (transport / #9479 race) — NOT quarantining" >&2`,
    `      exit 1`,
    `    fi`,
    `  fi`,
  ]
}

export default workflow("preparation", {
  kind: "preparation",
  dispatchNodes: ["package:code:@akasha/k8s-synth"],
  dispatchNodeTypes: ["package", "md-file"],
  alwaysRun: true,
  steps: [
    ...PREP_PROVISION_STEPS,

    {
      ...step({
        name: "preparation-prep",
        image: IMAGES.BUN_GIT,
        alwaysRun: true,
        environment: {
          BUN_INSTALL_CACHE_DIR: "/ci-storage/bun-cache",
          BUN_TMPDIR: "/ci-storage/tmp",
        },
        backendOptions: {
          kubernetes: {
            resources: {
              requests: { memory: "2Gi" },
              limits: { memory: "4Gi" },
            },
          },
        },
        commands: (ci) => [
          "set -e",

          PREP_SELFHEAL_SH_FUNCTIONS,

          "if [ ! -f /ci-storage/repo/HEAD ]; then",
          "  git init --bare /ci-storage/repo",
          "  git -C /ci-storage/repo config gc.auto 0 || true",
          "fi",

          "rm -f /ci-storage/repo/gc.log",

          `WS=/ci-storage/checkouts/${ci.commitSha}`,

          "PREP_FETCH_ERR=$(mktemp)",

          "(",
          '  flock -x -w 60 9 || { echo "ERROR: prep flock timeout (#9479)" >&2; exit 1; }',
          "  git -C /ci-storage/repo worktree prune || true",
          ...prepFetchWithSelfHeal(
            `git -C /ci-storage/repo fetch --force "http://x-access-token:$GIT_ACCESS_TOKEN@git-transport.git.svc.cluster.local:3000/alan/akasha.git" ${ci.commitSha}:refs/pipelines/${ci.commitSha}`
          ),
          '  if [ -d "$WS/.git" ] || [ -f "$WS/.git" ]; then',
          `    echo "Reusing worktree (commit ${ci.commitSha})"`,
          "  else",
          `    git -C /ci-storage/repo worktree add --detach "$WS" ${ci.commitSha} || exit 1`,
          "  fi",
          ") 9>/ci-storage/.prep-repo.flock || exit 1",
          'rm -f "$PREP_FETCH_ERR"',

          ...installDepsCommands(ci.commitSha),

          'mkdir -p "$WS/.ci"',
          `bun "$AKASHA_ROOT/akasha/changes/workflow-selection/changed-files-writing/changed-files-writing.module.code.ts" --seq "$PIPELINE_SEQ" --out "$WS/.ci/changed-files.txt" || exit 1`,

          `echo "Workspace ready (commit ${ci.commitSha}, ${ci.changedFiles?.length ?? 0} changed files)"`,
        ],
      }),
      dependsOn: ["preparation-provision-ci-toolchain"],
    },

    ...PREP_CONTENT_CACHE_STEPS,
    {
      ...step({
        name: "preparation-synth-k8s",
        image: IMAGES.BUN_GIT,
        alwaysRun: true,
        commands: (ci) => [
          "set -e",
          `WS=/ci-storage/checkouts/${ci.commitSha}`,
          `bun "$AKASHA_ROOT/akasha/infrastructure/k8s-synth/synth-running/synth-running.module.code.ts" --write --root "$WS"`,
        ],
      }),
      dependsOn: ["preparation-prep"],
    },
  ],
})

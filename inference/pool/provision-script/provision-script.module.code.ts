import {
  condaEnvName,
  LAUNCHD_LABEL_PREFIX,
  launchdLabel,
  plistPath,
  serviceDir,
} from "akasha/inference/pool/inference-naming/inference-naming.module.code.ts"
import {
  type ActualResource,
  ActualResourceSchema,
  type InferenceHost,
} from "akasha/inference/pool/inference-schema/inference-schema.module.code.ts"
import { quoted } from "akasha/shell/quoting/quoting.module.code.ts"

export interface Provisioned {
  readonly name: string
  readonly pythonVersion: string
  readonly sourceDir: string
  readonly workdir: string
  readonly runs: string
  readonly lifecycle: "pool" | "always-on"
}

function provisionScriptName(sourceDir: string): string {
  const slug = sourceDir.slice(sourceDir.lastIndexOf("/") + 1)
  return `${slug}.shell-script.shell.sh`
}

const MLX_RECORD_PROBE_PY = [
  "import sys, os, glob",
  "root = sys.argv[1]",
  'spg = glob.glob(os.path.join(root, "lib", "python*", "site-packages"))',
  "ok = bool(spg)",
  "if spg:",
  "    sp = spg[0]",
  '    seen = {"mlx": False, "mlx_metal": False}',
  '    for key, pat in (("mlx", "mlx-*.dist-info"), ("mlx_metal", "mlx_metal-*.dist-info")):',
  "        for d in glob.glob(os.path.join(sp, pat)):",
  "            seen[key] = True",
  '            rec = os.path.join(d, "RECORD")',
  "            if not os.path.isfile(rec):",
  "                ok = False",
  "                continue",
  '            with open(rec, encoding="utf-8") as fh:',
  "                for line in fh:",
  '                    p = line.split(",")[0].strip()',
  '                    if not p or p.endswith(".pyc"):',
  "                        continue",
  "                    if not os.path.exists(os.path.normpath(os.path.join(sp, p))):",
  "                        ok = False",
  "                        break",
  '    ok = ok and seen["mlx"] and seen["mlx_metal"]',
  "sys.exit(0 if ok else 1)",
].join("\n")

export function buildQueryScript(
  host: InferenceHost,
  healthProbeNames: readonly string[] = []
): string {
  const root = `${host.home}/inference`
  const labelRe = `^${LAUNCHD_LABEL_PREFIX.replaceAll(".", "\\.")}`
  const labelStrip = `s/^${LAUNCHD_LABEL_PREFIX.replaceAll(".", "\\.")}//`
  const condaBase = host.condaSh.replace(/\/etc\/profile\.d\/conda\.sh$/, "")
  const lines = [
    "set -u",
    `INF_ROOT=${quoted(root)}`,
    `if [ -d "$INF_ROOT" ]; then`,
    `  for d in "$INF_ROOT"/*/; do`,
    `    [ -d "$d" ] || continue`,
    `    name="$(basename "$d")"`,
    `    if [ -f "$d/.inputs-hash" ]; then h="$(cat "$d/.inputs-hash")"; else h="NONE"; fi`,
    `    echo "DIR $name $h"`,
    `  done`,
    "fi",
    `launchctl list 2>/dev/null | awk 'NR>1 {print $3}' | grep -E ${quoted(labelRe)} | sed ${quoted(labelStrip)} | while read -r n; do echo "LAUNCHD $n"; done || true`,
    `source ${quoted(host.condaSh)} 2>/dev/null || true`,
    `conda env list 2>/dev/null | awk '{print $1}' | grep -E '^inference-' | sed 's/^inference-//' | while read -r n; do echo "CONDA $n"; done || true`,
  ]
  if (healthProbeNames.length > 0) {
    const names = healthProbeNames.map(quoted).join(" ")
    lines.push(
      `CONDA_BASE=${quoted(condaBase)}`,
      `for hn in ${names}; do`,
      `  ENV_PREFIX="$CONDA_BASE/envs/inference-$hn"`,
      `  PYBIN="$ENV_PREFIX/bin/python"`,
      `  if [ -x "$PYBIN" ]; then`,
      `    if ! "$PYBIN" - "$ENV_PREFIX" <<'INFERENCE_HEALTH_EOF' >/dev/null 2>&1`,
      MLX_RECORD_PROBE_PY,
      "INFERENCE_HEALTH_EOF",
      `    then echo "CONDABAD $hn"; fi`,
      `  elif [ -d "$ENV_PREFIX" ]; then`,
      `    echo "CONDABAD $hn"`,
      `  fi`,
      `done`
    )
  }
  lines.push("exit 0", "")
  return lines.join("\n")
}

export function buildMfluxQueryScript(host: InferenceHost, serviceName: string): string {
  return [
    "set -u",
    `source ${quoted(host.condaSh)} 2>/dev/null || true`,
    `conda activate ${quoted(condaEnvName(serviceName))} 2>/dev/null || { echo "ENV_MISSING"; exit 0; }`,
    `ls "$CONDA_PREFIX"/bin/ 2>/dev/null | grep -E ${quoted("^mflux-")} || true`,
    "exit 0",
    "",
  ].join("\n")
}

export function buildRunScript(host: InferenceHost, service: Provisioned): string {
  const cwd = `${serviceDir(host.home, service.name)}/${service.workdir}`
  const execLine = `exec ${service.runs}`
  return [
    "#!/bin/bash",
    "set -euo pipefail",
    `source ${quoted(host.condaSh)}`,
    `conda activate ${quoted(condaEnvName(service.name))}`,
    `cd ${quoted(cwd)}`,
    execLine,
    "",
  ].join("\n")
}

export function buildPlist(host: InferenceHost, service: Provisioned): string {
  const dir = serviceDir(host.home, service.name)
  const supervised = service.lifecycle === "always-on"
  const boolTag = (v: boolean) => (v ? "<true/>" : "<false/>")
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${launchdLabel(service.name)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>${dir}/run.sh</string>
  </array>
  <key>RunAtLoad</key>
  ${boolTag(supervised)}
  <key>KeepAlive</key>
  ${boolTag(supervised)}
  <key>StandardOutPath</key>
  <string>${dir}/logs/stdout.log</string>
  <key>StandardErrorPath</key>
  <string>${dir}/logs/stderr.log</string>
</dict>
</plist>
`
}

export function buildApplyScript(args: {
  host: InferenceHost
  service: Provisioned
  inputsHash: string
}): string {
  const { host, service, inputsHash } = args
  const dir = serviceDir(host.home, service.name)
  const label = launchdLabel(service.name)
  const plist = plistPath(host.home, service.name)
  const runScript = buildRunScript(host, service)
  const plistBody = buildPlist(host, service)
  return [
    "set -euo pipefail",
    `SVC_DIR=${quoted(dir)}`,
    `mkdir -p "$SVC_DIR" "$SVC_DIR/logs" ${quoted(`${host.home}/Library/LaunchAgents`)}`,
    `source ${quoted(host.condaSh)}`,
    `# Idempotent per-service provisioning (clone, conda env, weights).`,
    `bash "$SVC_DIR/src/${provisionScriptName(service.sourceDir)}" ${quoted(service.name)} ${quoted(service.pythonVersion)} "$SVC_DIR" ${quoted(host.condaSh)}`,
    `# launchd wrapper`,
    `cat > "$SVC_DIR/run.sh" <<'INFERENCE_RUN_EOF'`,
    runScript.trimEnd(),
    "INFERENCE_RUN_EOF",
    `chmod +x "$SVC_DIR/run.sh"`,
    `# launchd plist`,
    `cat > ${quoted(plist)} <<'INFERENCE_PLIST_EOF'`,
    plistBody.trimEnd(),
    "INFERENCE_PLIST_EOF",
    `uid="$(id -u)"`,
    `# (Re)load the launchd job. The bootstrap call intermittently fails with`,
    `# "5: Input/output error" (EIO) when it races the asynchronous teardown that`,
    `# precedes it — a window that widens right after heavy provisioning churns the`,
    `# machine. Retry the transient EIO / in-progress class, re-booting-out each`,
    `# attempt so a job that never fully left is cleared; surface any other failure`,
    `# immediately. The plist's RunAtLoad starts the freshly-registered job, so no`,
    `# kickstart is needed (a redundant 'kickstart -k' would race that auto-start`,
    `# and exit non-zero, aborting the apply under set -e even though it converged).`,
    `bootstrapped=`,
    `for attempt in 1 2 3 4 5 6; do`,
    `  launchctl bootout "gui/$uid/${label}" 2>/dev/null || true`,
    `  if boot_err="$(launchctl bootstrap "gui/$uid" ${quoted(plist)} 2>&1)"; then`,
    `    bootstrapped=1`,
    `    break`,
    `  fi`,
    `  case "$boot_err" in`,
    `  *"Input/output error"* | *"in progress"*)`,
    `    sleep 3`,
    `    ;;`,
    `  *)`,
    `    echo "$boot_err" >&2`,
    `    exit 1`,
    `    ;;`,
    `  esac`,
    `done`,
    `if [ -z "$bootstrapped" ]; then`,
    `  echo "launchctl bootstrap failed after retries: $boot_err" >&2`,
    `  exit 1`,
    `fi`,
    `# Stamp the content hash last — a failed step above aborts before this.`,
    `echo ${quoted(inputsHash)} > "$SVC_DIR/.inputs-hash"`,
    "",
  ].join("\n")
}

export function buildPruneScript(args: { host: InferenceHost; name: string }): string {
  const { host, name } = args
  const label = launchdLabel(name)
  return [
    "set -uo pipefail",
    `uid="$(id -u)"`,
    `launchctl bootout "gui/$uid/${label}" 2>/dev/null || true`,
    `rm -f ${quoted(plistPath(host.home, name))}`,
    `rm -rf ${quoted(serviceDir(host.home, name))}`,
    `source ${quoted(host.condaSh)} 2>/dev/null || true`,
    `conda env remove -n ${quoted(condaEnvName(name))} -y 2>/dev/null || true`,
    "",
  ].join("\n")
}

export function parseActualState(raw: string): readonly ActualResource[] {
  const acc = new Map<
    string,
    {
      dirPresent: boolean
      inputsHash: string | null
      launchdLoaded: boolean
      condaEnvPresent: boolean
      condaEnvHealthy: boolean
    }
  >()
  const ensure = (
    name: string
  ): {
    dirPresent: boolean
    inputsHash: string | null
    launchdLoaded: boolean
    condaEnvPresent: boolean
    condaEnvHealthy: boolean
  } => {
    let e = acc.get(name)
    if (e === undefined) {
      e = {
        dirPresent: false,
        inputsHash: null,
        launchdLoaded: false,
        condaEnvPresent: false,
        condaEnvHealthy: true,
      }
      acc.set(name, e)
    }
    return e
  }
  for (const line of raw.split("\n")) {
    const parts = line.trim().split(/\s+/)
    if (parts[0] === "DIR" && parts[1] !== undefined) {
      const e = ensure(parts[1])
      e.dirPresent = true
      e.inputsHash = parts[2] === undefined || parts[2] === "NONE" ? null : parts[2]
    } else if (parts[0] === "LAUNCHD" && parts[1] !== undefined) {
      ensure(parts[1]).launchdLoaded = true
    } else if (parts[0] === "CONDA" && parts[1] !== undefined) {
      ensure(parts[1]).condaEnvPresent = true
    } else if (parts[0] === "CONDABAD" && parts[1] !== undefined) {
      ensure(parts[1]).condaEnvHealthy = false
    }
  }
  return [...acc.entries()].map(([name, e]) => ActualResourceSchema.parse({ name, ...e }))
}

export function parseMfluxTools(raw: string): readonly string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("mflux-"))
    .sort()
}

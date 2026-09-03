import { synthManifests } from "../synth-manifests/synth-manifests.module.code.ts"

const PREFIX = "[k8s-synth]"

export function driftReport(drifts: readonly string[]): string {
  return [
    `${PREFIX} ${drifts.length} generated file(s) drift from their synth.ts source:`,
    "",
    ...drifts.map((drift) => `  ${drift}`),
    "",
    "fix: re-run this with --write and re-commit.",
    "",
  ].join("\n")
}

export function flagValue(argv: readonly string[], name: string): string | undefined {
  const at = argv.indexOf(name)
  if (at === -1) return undefined
  const value = argv[at + 1]
  return value === undefined || value.startsWith("--") ? undefined : value
}

export async function runSynth(argv: readonly string[]): Promise<number> {
  if (argv.includes("--check") && argv.includes("--write")) {
    process.stderr.write(`${PREFIX} --check and --write are mutually exclusive\n`)
    return 1
  }
  const roots = argv.filter((one) => one === "--root").length
  if (roots > 1) {
    process.stderr.write(
      `${PREFIX} --root was given ${roots} times, and every generated file is written beside its own synth.ts, so there is one root to write under\n`
    )
    return 1
  }
  const repoRoot = flagValue(argv, "--root")
  const pkgFilter = flagValue(argv, "--pkg")
  const check = argv.includes("--check")

  const result = await synthManifests({ repoRoot, pkgFilter, check })

  if (result.synthPaths.length === 0 && pkgFilter !== undefined) {
    process.stderr.write(`${PREFIX} no synth.ts whose path contains component "${pkgFilter}"\n`)
    return 1
  }
  if (check && result.drifts.length > 0) {
    process.stderr.write(driftReport(result.drifts))
    return 1
  }
  return 0
}

if (import.meta.main) process.exit(await runSynth(process.argv.slice(2)))

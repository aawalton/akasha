import type {
  BenchmarkPhase,
  StepTiming,
} from "../benchmark-report-types/benchmark-report-types.module.code.ts"

export interface PhaseRollup {
  readonly phase: BenchmarkPhase
  readonly totalStepMs: number
  readonly totalStepSeconds: number
  readonly stepCount: number
  readonly skippedCount: number
}

export interface DockerSkipCensus {
  readonly count: number
  readonly names: readonly string[]
}

export interface SmokeVerdict {
  readonly pass: boolean
  readonly failedSteps: readonly string[]
}

export interface RedStep {
  readonly name: string
  readonly exitCode: number
}

export interface PhaseDelta {
  readonly phase: BenchmarkPhase
  readonly diskMs: number
  readonly memoryMs: number
  readonly deltaMs: number
  readonly speedupPct: number
}

const PHASE_ORDER = ["cold-stage", "warm-prep", "check"] as const

function phaseMs(steps: readonly StepTiming[], phase: BenchmarkPhase): number {
  return steps.reduce((sum, s) => (s.phase === phase && !s.skipped ? sum + s.durationMs : sum), 0)
}

function toStepSeconds(ms: number): number {
  return Math.round(ms / 100) / 10
}

export function aggregatePhases(steps: readonly StepTiming[]): readonly PhaseRollup[] {
  return PHASE_ORDER.map((phase) => {
    const inPhase = steps.filter((s) => s.phase === phase)
    const totalStepMs = phaseMs(steps, phase)
    return {
      phase,
      totalStepMs,
      totalStepSeconds: toStepSeconds(totalStepMs),
      stepCount: inPhase.filter((s) => !s.skipped).length,
      skippedCount: inPhase.filter((s) => s.skipped).length,
    }
  })
}

export function dockerSkipCensus(steps: readonly StepTiming[]): DockerSkipCensus {
  const names = steps
    .filter((s) => s.skipped)
    .map((s) => s.name)
    .sort((a, b) => a.localeCompare(b))
  return { count: names.length, names }
}

export function smokeVerdict(steps: readonly StepTiming[]): SmokeVerdict {
  const failedSteps = steps.filter((s) => !s.skipped && s.exitCode !== 0).map((s) => s.name)
  return { pass: failedSteps.length === 0, failedSteps }
}

export function redSet(steps: readonly StepTiming[]): readonly RedStep[] {
  return steps
    .filter((s) => !s.skipped && s.exitCode !== 0)
    .map((s) => ({ name: s.name, exitCode: s.exitCode }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function redSetsMatch(a: readonly RedStep[], b: readonly RedStep[]): boolean {
  if (a.length !== b.length) return false
  return a.every((r, i) => {
    const other = b[i]
    return other !== undefined && other.name === r.name && other.exitCode === r.exitCode
  })
}

export function formatRedSet(red: readonly RedStep[]): string {
  return red.length === 0 ? "∅" : red.map((r) => `${r.name}(${r.exitCode})`).join(", ")
}

export interface DeclaredRed {
  readonly name: string
  readonly exitCode: number
  readonly cause: string
}

export const DECLARED_BENCHMARK_REDS: readonly DeclaredRed[] = [
  {
    name: "check-sops-manifests",
    exitCode: 2,
    cause:
      "decryption succeeds; reds at `kubectl create --dry-run=client` needing the in-cluster API (localhost:8080) for openapi schema validation — unreachable in the hermetic pod. EXIT 2 RATHER THAN 1 SINCE #18691: the check probes that arm with a known-good manifest and reports an unreachable cluster on the tool-error channel, where it used to report one violation per manifest file on the violation channel. The env gap is unchanged and the member stays declared; only the channel moved",
  },
  {
    name: "check-unit-tests",
    exitCode: 123,
    cause:
      "a unit-test shard exits non-zero on load — needs a service the hermetic pod lacks; shards otherwise report 0 fail",
  },
  {
    name: "check-lint",
    exitCode: 1,
    cause:
      "Biome INTERNAL panic 'no entry found for key' (biome_js_semantic/scope.rs:150) — an upstream Biome bug (dalla #14564), DETERMINISTIC across both store variants, not a code lint error",
  },
]

export function undeclaredReds(
  actual: readonly RedStep[],
  declared: readonly DeclaredRed[]
): readonly RedStep[] {
  return actual.filter((r) => !declared.some((d) => d.name === r.name && d.exitCode === r.exitCode))
}

export type StoreDeltaResult =
  | { readonly kind: "delta"; readonly phases: readonly PhaseDelta[] }
  | { readonly kind: "refused"; readonly reason: string }

export function computeStoreDelta(
  disk: readonly StepTiming[],
  memory: readonly StepTiming[]
): StoreDeltaResult {
  const diskRed = redSet(disk)
  const memoryRed = redSet(memory)
  if (!redSetsMatch(diskRed, memoryRed)) {
    return {
      kind: "refused",
      reason:
        "red sets differ — refusing to compute a store delta over mismatched workloads " +
        `(disk red: ${formatRedSet(diskRed)}; memory red: ${formatRedSet(memoryRed)})`,
    }
  }
  const phases = PHASE_ORDER.map((phase) => {
    const diskMs = phaseMs(disk, phase)
    const memoryMs = phaseMs(memory, phase)
    const deltaMs = diskMs - memoryMs
    const speedupPct = diskMs === 0 ? 0 : Math.round((deltaMs / diskMs) * 1000) / 10
    return { phase, diskMs, memoryMs, deltaMs, speedupPct }
  })
  return { kind: "delta", phases }
}

export const BENCHMARK_PHASE_ORDER: ReadonlyArray<BenchmarkPhase> = PHASE_ORDER

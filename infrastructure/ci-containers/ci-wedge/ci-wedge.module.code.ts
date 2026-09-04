import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { containerCpuRateCores } from "../ci-container-cpu-rate/ci-container-cpu-rate.module.code.ts"
import { describeErr } from "../ci-reaper-ceiling/ci-reaper-ceiling.module.code.ts"
import {
  type CiContainer,
  lastLogMoment,
} from "../ci-reaper-cluster/ci-reaper-cluster.module.code.ts"
import {
  EXIT_CODE,
  FAILURE_REASON,
  type MatchedStep,
} from "../ci-reaper-step-pages/ci-reaper-step-pages.module.code.ts"
import { takeStepIfStatus } from "../ci-step-taking/ci-step-taking.module.code.ts"

export const WEDGE_MIN_RUNNING_MS = 180_000

export const CPU_RATE_WINDOW_MS = 180_000

export const CPU_IDLE_THRESHOLD_CORES = 0.01

export const WEDGE_LOG_STALE_MS = 480_000

export const WEDGE_EXIT_CODE = 124

export const WEDGE_FAILURE_REASON = "build-wedged"

export interface WedgeCandidateInput {
  readonly stepStatus: string | null
  readonly stepTerminated: boolean
  readonly startedAtMs: number | null
  readonly now: number
}

export function isWedgeCandidate(input: WedgeCandidateInput, minRunningMs: number): boolean {
  if (input.stepStatus !== "running") return false
  if (input.stepTerminated) return false
  if (input.startedAtMs === null) return false
  return input.now - input.startedAtMs >= minRunningMs
}

export interface WedgeInput {
  readonly cpuRateCores: number | null
  readonly idleThresholdCores: number
  readonly logAgeMs: number | null
  readonly logStaleMs: number
}

export type WedgeDecision =
  | { readonly wedged: true }
  | {
      readonly wedged: false
      readonly reason: "cpu-active" | "no-data" | "log-fresh" | "log-unknown"
    }

export function decideWedge(input: WedgeInput): WedgeDecision {
  if (input.cpuRateCores === null) return { wedged: false, reason: "no-data" }
  if (input.cpuRateCores > input.idleThresholdCores) return { wedged: false, reason: "cpu-active" }
  if (input.logAgeMs === null) return { wedged: false, reason: "log-unknown" }
  if (input.logAgeMs < input.logStaleMs) return { wedged: false, reason: "log-fresh" }
  return { wedged: true }
}

export interface WedgeDeps {
  readonly roots: Roots
  readonly log: (line: string) => void
  readonly signal: AbortSignal
}

export interface WedgeResult {
  readonly checked: number
  readonly failFast: number
}

function momentOf(startedAt: string | null): number | null {
  if (startedAt === null) return null
  const ms = Date.parse(startedAt)
  return Number.isNaN(ms) ? null : ms
}

export async function failFastWedged(
  deps: WedgeDeps,
  containers: readonly CiContainer[],
  stepByContainer: ReadonlyMap<string, MatchedStep>,
  now: number
): Promise<WedgeResult> {
  const candidates: { readonly container: string; readonly step: MatchedStep }[] = []
  for (const container of containers) {
    const step = stepByContainer.get(container.name)
    if (step === undefined) continue
    const eligible = isWedgeCandidate(
      {
        stepStatus: step.status,
        stepTerminated: container.stepTerminated !== null,
        startedAtMs: momentOf(step.startedAt),
        now,
      },
      WEDGE_MIN_RUNNING_MS
    )
    if (eligible) candidates.push({ container: container.name, step })
  }
  if (candidates.length === 0) return { checked: 0, failFast: 0 }

  deps.signal.throwIfAborted()
  const probes = await Promise.all(
    candidates.map(async (one) => {
      const [cpu, moment] = await Promise.allSettled([
        containerCpuRateCores(one.container, CPU_RATE_WINDOW_MS),
        lastLogMoment(one.container),
      ])
      if (cpu.status === "rejected") {
        deps.log(`wedge cpu probe failed container=${one.container} err=${describeErr(cpu.reason)}`)
      }
      if (moment.status === "rejected") {
        deps.log(
          `wedge log probe failed container=${one.container} err=${describeErr(moment.reason)}`
        )
      }
      return {
        cpuRateCores: cpu.status === "fulfilled" ? cpu.value : null,
        lastLogMs: moment.status === "fulfilled" ? moment.value : null,
      }
    })
  )

  let failFast = 0
  for (let i = 0; i < candidates.length; i += 1) {
    const one = candidates[i]
    const probe = probes[i]
    if (one === undefined || probe === undefined) continue
    const decision = decideWedge({
      cpuRateCores: probe.cpuRateCores,
      idleThresholdCores: CPU_IDLE_THRESHOLD_CORES,
      logAgeMs: probe.lastLogMs === null ? null : now - probe.lastLogMs,
      logStaleMs: WEDGE_LOG_STALE_MS,
    })
    if (!decision.wedged) continue
    try {
      const failed = takeStepIfStatus(deps.roots, one.step.seq, "running", {
        status: "failed",
        [EXIT_CODE]: WEDGE_EXIT_CODE,
        [FAILURE_REASON]: WEDGE_FAILURE_REASON,
      })
      if (!failed) continue
      failFast += 1
      deps.log(
        `wedge fail-fast step=${one.step.seq} container=${one.container}` +
          ` exit=${WEDGE_EXIT_CODE} reason=${WEDGE_FAILURE_REASON}`
      )
    } catch (err) {
      deps.log(`wedge fail-fast failed step=${one.step.seq} err=${describeErr(err)}`)
    }
    deps.signal.throwIfAborted()
  }
  return { checked: candidates.length, failFast }
}

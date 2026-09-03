import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { takeStepIfStatus } from "@tools/lib/take-step-status"
import { describeErr } from "../ci-reaper-ceiling/ci-reaper-ceiling.module.code.ts"
import { readStepLogTail } from "../ci-reaper-cluster/ci-reaper-cluster.module.code.ts"
import {
  INFRA_FAILURE_KIND,
  type MatchedStep,
} from "../ci-reaper-step-pages/ci-reaper-step-pages.module.code.ts"

export const INFRA_LOG_TAIL_LINES = 200

export interface LogSignature {
  readonly kind: string
  readonly allOf: readonly string[]
}

export const INFRA_LOG_SIGNATURES: readonly LogSignature[] = [
  { kind: "transport", allOf: [".svc.cluster.local", "connection refused"] },
  { kind: "transport", allOf: [".svc.cluster.local", "failed to connect"] },
  { kind: "transport", allOf: [".svc.cluster.local", "could not resolve host"] },
  { kind: "transport", allOf: [".svc.cluster.local", "no such host"] },
  { kind: "transport", allOf: [".svc.cluster.local", "temporary failure in name resolution"] },
  { kind: "transport", allOf: ["registry.registry.svc.cluster.local", "status: 5"] },
  { kind: "transport", allOf: [".svc.cluster.local", "i/o timeout"] },
  { kind: "check-tooling", allOf: ["[run-check]", "not a violation"] },
]

export function classifyLogSignature(logText: string): string | null {
  const hay = logText.toLowerCase()
  for (const one of INFRA_LOG_SIGNATURES) {
    if (one.allOf.every((needle) => hay.includes(needle))) return one.kind
  }
  return null
}

export interface StampDeps {
  readonly roots: Roots
  readonly log: (line: string) => void
  readonly signal: AbortSignal
}

export async function stampInfraFailureKinds(
  deps: StampDeps,
  containerNames: readonly string[],
  stepByContainer: ReadonlyMap<string, MatchedStep>
): Promise<number> {
  const candidates: { readonly container: string; readonly step: MatchedStep }[] = []
  for (const container of containerNames) {
    const step = stepByContainer.get(container)
    if (step === undefined || step.status !== "failed") continue
    candidates.push({ container, step })
  }
  if (candidates.length === 0) return 0

  deps.signal.throwIfAborted()
  const logs = await Promise.allSettled(
    candidates.map((one) => readStepLogTail(one.container, INFRA_LOG_TAIL_LINES))
  )

  let stamped = 0
  for (let i = 0; i < candidates.length; i += 1) {
    const one = candidates[i]
    const read = logs[i]
    if (one === undefined || read === undefined) continue
    if (read.status === "rejected") {
      deps.log(
        `infra-signature log read failed container=${one.container} err=${describeErr(read.reason)}`
      )
      continue
    }
    if (read.value === null) continue
    const kind = classifyLogSignature(read.value)
    if (kind === null) continue
    try {
      if (!takeStepIfStatus(deps.roots, one.step.seq, "failed", { [INFRA_FAILURE_KIND]: kind })) {
        continue
      }
      stamped += 1
      deps.log(`infra-signature step=${one.step.seq} container=${one.container} kind=${kind}`)
    } catch (err) {
      deps.log(`infra-signature stamp failed step=${one.step.seq} err=${describeErr(err)}`)
    }
    deps.signal.throwIfAborted()
  }
  return stamped
}

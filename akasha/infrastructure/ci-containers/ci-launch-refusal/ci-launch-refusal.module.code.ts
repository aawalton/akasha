import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { takeStepIfStatus } from "@tools/lib/take-step-status"
import { decideLaunchRefusal } from "../ci-reap-decision/ci-reap-decision.module.code.ts"
import { describeErr } from "../ci-reaper-ceiling/ci-reaper-ceiling.module.code.ts"
import {
  type CiContainer,
  deleteCiContainer,
} from "../ci-reaper-cluster/ci-reaper-cluster.module.code.ts"
import {
  LAUNCH_REFUSED_REASON,
  type MatchedStep,
} from "../ci-reaper-step-pages/ci-reaper-step-pages.module.code.ts"

export interface RefusalDeps {
  readonly roots: Roots
  readonly log: (line: string) => void
  readonly signal: AbortSignal
}

export async function markLaunchRefusals(
  deps: RefusalDeps,
  containers: readonly CiContainer[],
  stepByContainer: ReadonlyMap<string, MatchedStep>
): Promise<number> {
  const husks: string[] = []
  let refused = 0
  for (const container of containers) {
    const step = stepByContainer.get(container.name)
    if (step === undefined) continue
    const decision = decideLaunchRefusal({
      stepStatus: step.status,
      phase: container.phase,
      containerReason: container.reason,
    })
    if (!decision.mark) continue
    try {
      const marked = takeStepIfStatus(deps.roots, step.seq, "launching", {
        [LAUNCH_REFUSED_REASON]: decision.reason,
      })
      if (!marked) continue
      refused += 1
      husks.push(container.name)
      deps.log(
        `launch-refused step=${step.seq} container=${container.name} reason=${decision.reason}`
      )
    } catch (err) {
      deps.log(`launch-refused mark failed step=${step.seq} err=${describeErr(err)}`)
    }
    deps.signal.throwIfAborted()
  }

  if (husks.length === 0) return refused
  deps.signal.throwIfAborted()
  const removed = await Promise.allSettled(husks.map((name) => deleteCiContainer(name)))
  for (let i = 0; i < husks.length; i += 1) {
    const one = removed[i]
    const name = husks[i]
    if (one === undefined || name === undefined) continue
    if (one.status === "rejected") {
      deps.log(`husk delete failed container=${name} err=${describeErr(one.reason)}`)
    }
  }
  return refused
}

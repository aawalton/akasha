import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { stampInfraFailureKinds } from "../ci-infra-signature/ci-infra-signature.module.code.ts"
import { markLaunchRefusals } from "../ci-launch-refusal/ci-launch-refusal.module.code.ts"
import {
  pipelineSeqFromContainerName,
  type ReapReason,
  shouldReapContainer,
} from "../ci-reap-decision/ci-reap-decision.module.code.ts"
import { describeErr, withCeiling } from "../ci-reaper-ceiling/ci-reaper-ceiling.module.code.ts"
import {
  type CiContainer,
  deleteCiContainer,
  listCiContainers,
} from "../ci-reaper-cluster/ci-reaper-cluster.module.code.ts"
import {
  type MatchedStep,
  pipelineStatusBySeq,
  stepsByContainerName,
} from "../ci-reaper-step-pages/ci-reaper-step-pages.module.code.ts"
import { failFastWedged } from "../ci-wedge/ci-wedge.module.code.ts"

export const LOG = "ci-container-reaper:"

export const TICK_MS = 60_000

export const TICK_CEILING_MS = 300_000

export interface ReaperResult {
  readonly listed: number
  readonly reaped: number
  readonly reapedOrphanTerminal: number
  readonly skippedNonTerminal: number
  readonly skippedOrphanPipelineRunning: number
  readonly skippedNoPipeline: number
  readonly skippedNoStepOutOfBand: number
  readonly launchRefused: number
  readonly wedgeChecked: number
  readonly wedgeFailFast: number
  readonly infraStamped: number
}

export async function runCiContainerReaperTick(
  roots: Roots,
  signal: AbortSignal,
  log: (line: string) => void = (line) => console.log(`${LOG} ${line}`)
): Promise<ReaperResult> {
  signal.throwIfAborted()
  const containers = await listCiContainers()
  signal.throwIfAborted()

  const containerNames = containers.map((one) => one.name)
  const stepByContainer = stepsByContainerName(roots, containerNames)

  const orphanSeqs = new Set<string>()
  for (const container of containers) {
    if (stepByContainer.has(container.name)) continue
    const seq = pipelineSeqFromContainerName(container.name)
    if (seq !== null) orphanSeqs.add(seq)
  }
  const statusBySeq = pipelineStatusBySeq(roots, [...orphanSeqs])
  signal.throwIfAborted()

  const skipped = new Map<ReapReason, number>()
  const reapTargets: { readonly name: string; readonly orphan: boolean }[] = []
  for (const container of containers) {
    const step = stepByContainer.get(container.name) ?? null
    const seq = step === null ? pipelineSeqFromContainerName(container.name) : null
    const decision = shouldReapContainer({
      containerName: container.name,
      stepStatus: step?.status ?? null,
      pipelineStatus: seq === null ? null : (statusBySeq.get(seq) ?? null),
    })
    if (decision.reap) {
      reapTargets.push({
        name: container.name,
        orphan: decision.reason === "pipeline-terminal-orphan",
      })
      continue
    }
    skipped.set(decision.reason, (skipped.get(decision.reason) ?? 0) + 1)
  }

  const infraStamped = await stampInfraFailureKinds(
    { roots, log, signal },
    containerNames,
    stepByContainer
  )

  signal.throwIfAborted()
  const removed = await Promise.allSettled(reapTargets.map((one) => deleteCiContainer(one.name)))
  let reaped = 0
  let reapedOrphanTerminal = 0
  for (let i = 0; i < reapTargets.length; i += 1) {
    const one = removed[i]
    const target = reapTargets[i]
    if (one === undefined || target === undefined) continue
    if (one.status === "rejected") {
      log(`delete failed container=${target.name} err=${describeErr(one.reason)}`)
      continue
    }
    if (target.orphan) reapedOrphanTerminal += 1
    else reaped += 1
  }

  const launchRefused = await markLaunchRefusals(
    { roots, log, signal },
    containers,
    stepByContainer
  )

  signal.throwIfAborted()
  const wedge = await failFastWedged(
    { roots, log, signal },
    containers,
    stepByContainer,
    Date.now()
  )

  const result: ReaperResult = {
    listed: containers.length,
    reaped,
    reapedOrphanTerminal,
    skippedNonTerminal: skipped.get("step-non-terminal") ?? 0,
    skippedOrphanPipelineRunning: skipped.get("orphan-pipeline-running") ?? 0,
    skippedNoPipeline: skipped.get("no-pipeline") ?? 0,
    skippedNoStepOutOfBand: skipped.get("no-step-out-of-band") ?? 0,
    launchRefused,
    wedgeChecked: wedge.checked,
    wedgeFailFast: wedge.failFast,
    infraStamped,
  }
  log(
    `listed=${result.listed} reaped=${result.reaped}` +
      ` reaped_orphan_terminal=${result.reapedOrphanTerminal}` +
      ` skipped_non_terminal=${result.skippedNonTerminal}` +
      ` skipped_orphan_pipeline_running=${result.skippedOrphanPipelineRunning}` +
      ` skipped_no_pipeline=${result.skippedNoPipeline}` +
      ` skipped_no_step_out_of_band=${result.skippedNoStepOutOfBand}` +
      ` launch_refused=${result.launchRefused}` +
      ` wedge_checked=${result.wedgeChecked} wedge_fail_fast=${result.wedgeFailFast}` +
      ` infra_stamped=${result.infraStamped}`
  )
  return result
}

export async function runBoundedCiContainerReaperTick(
  roots: Roots,
  signal: AbortSignal
): Promise<void> {
  await withCeiling("a tick of the ci container reaper", TICK_CEILING_MS, () =>
    runCiContainerReaperTick(roots, signal)
  )
}

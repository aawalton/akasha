#!/usr/bin/env bun
export const tool = {
  summary: "Run the CI orchestrator — drive every pipeline still owed a run",
  repos: ["akasha"],
} as const

import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { LOG } from "@akasha/pipeline-orchestration/orchestrator-log"
import {
  runBoundedOrchestratorTick,
  TICK_CEILING_MS,
  TICK_MS,
} from "@akasha/pipeline-orchestration/orchestrator-tick"

const HELP = `bun services/ci-orchestrator.ts — the standing driver over every live pipeline

One workstation process. Every ${TICK_MS / 1000} seconds it reads the pipeline, workflow and step
pages as files and does two things.

It reads which pipelines have not reached a verdict: every pipeline whose own status is
\`pending\`, \`dispatching\` or \`running\`, plus every pipeline that reached a verdict itself but
still holds a workflow or a step that has not. The second set is reported as healing, one line
per pipeline, because a settled parent over unsettled children is a pipeline nothing is driving.

It answers failures a later run cured. A pipeline that failed and has a newer pipeline on the
same branch is answered elsewhere once every workflow it failed or blocked on has passed on a
later pipeline of that branch. Answering one sets the pipeline to \`answered-elsewhere\` and
carries that to its failed and blocked workflows and to their failed and blocked steps.

No pipeline worker is dispatched from here, and none is dispatched anywhere. What a worker did
is work on the pages themselves, which is why it reaches the workstation as a service of its own
rather than the cluster. Nothing here reaches the cluster at all.

A tick still working ${TICK_CEILING_MS / 1000} seconds after it started ends the process rather
than leaving a second one to start beside it, and systemd restarts it.

It runs until stopped. SIGTERM and SIGINT both end the loop at its next boundary.

Usage:
  bun services/ci-orchestrator.ts
  --help  This.

Environment:
  AKASHA_ROOT        The akasha checkout holding the page types and the property
                     definitions those pages are read through. Defaults to this one.
`

function sleepAbortable(ms: number, signal: AbortSignal): Promise<boolean> {
  if (signal.aborted) return Promise.resolve(false)
  return new Promise<boolean>((resolve) => {
    const cleanup = (): undefined => {
      clearTimeout(timer)
      signal.removeEventListener("abort", onAbort)
    }
    const onAbort = (): undefined => {
      cleanup()
      resolve(false)
    }
    const timer = setTimeout(() => {
      cleanup()
      resolve(true)
    }, ms)
    signal.addEventListener("abort", onAbort, { once: true })
  })
}

async function main(): Promise<void> {
  if (process.argv.slice(2).some((one) => one === "--help" || one === "-h")) {
    process.stdout.write(HELP)
    return
  }

  const ac = new AbortController()
  process.on("SIGTERM", () => ac.abort())
  process.on("SIGINT", () => ac.abort())

  const roots = resolveRoots()

  console.log(
    `${LOG} starting tick loop pid=${process.pid} tick=${TICK_MS}ms ceiling=${TICK_CEILING_MS}ms`
  )

  while (!ac.signal.aborted) {
    try {
      runBoundedOrchestratorTick(roots)
    } catch (err) {
      if (!ac.signal.aborted) console.error(`${LOG} tick threw:`, err)
    }
    const slept = await sleepAbortable(TICK_MS, ac.signal)
    if (!slept) break
  }

  console.log(`${LOG} stopping`)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(`${LOG} fatal:`, err)
    process.exit(1)
  })
}

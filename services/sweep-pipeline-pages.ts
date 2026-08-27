#!/usr/bin/env bun
export const tool = {
  summary: "Run the pipeline page sweep — carry every unfinished pipeline, workflow and step forward",
  repos: ["akasha"],
} as const

import { CeilingExceeded } from "../tools/lib/sweep-pipeline-pages/ceiling.ts"
import {
  LOG,
  runBoundedSweepTick,
  TICK_CEILING_MS,
  TICK_MS,
} from "../tools/lib/sweep-pipeline-pages/tick.ts"
import { resolveRoots } from "../repo/roots/roots"

const HELP = `bun services/sweep-pipeline-pages.ts — the state machine over every live pipeline page

One workstation process for every pipeline, not one per pipeline. Every ${TICK_MS / 1000} seconds it
reads the pipeline, workflow and step pages as files, decides what each one owes, and writes the
moves it decided. It repeats within the tick until a pass writes nothing, so a step reaching its
verdict carries its workflow and its pipeline in the same tick.

WHAT IT DECIDES. A pending pipeline holding workflows starts dispatching, waiting behind an older
underway pipeline while it is on main. A pending workflow whose dependencies passed starts
dispatching, and one whose dependency failed is blocked. A pending step whose dependencies have
settled and whose gate is met is dispatched. Every parent's verdict rolls up from its children,
and answering, overtaking or cancelling a parent carries to its children.

IT OWNS THE STEP VERDICT. It reads the step containers from the k8s API and writes what it finds:
a step at \`launching\` whose container has started goes to \`running\` beside the moment it
started, and a step at \`running\` whose container has exited goes to \`passed\` or \`failed\` beside
the exit code and what killed it. Nothing reports itself back; nothing here listens.

A CLUSTER READ THAT FAILS MOVES NO STEP off \`launching\` or \`running\` that tick. Every other move
still lands, because none of them turns on what the cluster said.

STATE IS FILES. A pipeline's and a workflow's status stands in its page, so a move there is a
commit; a step's whole state stands in the gitignored sidecar beside its page, so nothing it
writes about a step is committed. Every write is guarded on the status it was decided from, read
again immediately before the write.

A tick that has not answered inside ${TICK_CEILING_MS / 1000} seconds ends the process rather than
starting a second one beside it, and systemd restarts it.

It runs until stopped. SIGTERM and SIGINT both end the loop at its next boundary.

Usage:
  bun services/sweep-pipeline-pages.ts
  --help  This.

Environment:
  PIPELINE_SA_TOKEN  Service-account token for the k8s API server, which is how a step's container
                     is read. Required.
  K8S_API_BASE       The k8s API server this reads. Required.
  K8S_CA_CERT_B64    That API server's CA certificate, base64.
  AKASHA_ROOT        The akasha checkout holding the page types and the property definitions
                     those pages are read through. Defaults to this one.
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
    const startedAt = Date.now()
    try {
      const report = await runBoundedSweepTick(roots, ac.signal)
      if (report.applied > 0) {
        console.log(
          `${LOG} tick applied=${report.applied} passes=${report.passes}` +
            ` containers=${report.containers ?? "unread"} elapsed_ms=${Date.now() - startedAt}`
        )
      }
    } catch (err) {
      if (err instanceof CeilingExceeded) {
        console.error(`${LOG} ${err.message}`)
        process.exit(1)
      }
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

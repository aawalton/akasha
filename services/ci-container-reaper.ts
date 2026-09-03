#!/usr/bin/env bun
export const tool = {
  summary: "Run the CI container reaper — clear finished step containers off the cluster",
  repos: ["akasha"],
} as const

import { CeilingExceeded } from "@akasha/ci-containers/ci-reaper-ceiling"
import {
  LOG,
  runBoundedCiContainerReaperTick,
  TICK_CEILING_MS,
  TICK_MS,
} from "@akasha/ci-containers/ci-reaper-tick"
import { WEDGE_EXIT_CODE } from "@akasha/ci-containers/ci-wedge"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"

const HELP = `bun services/ci-container-reaper.ts — clear finished step containers off the cluster

One workstation process. Every ${TICK_MS / 1000} seconds it lists every container in the cluster's
\`ci\` namespace, matches each against the step page that names it, and does four things:

  Reaps      deletes a container whose step has reached a verdict, and one left behind by a
             pipeline that has reached one.
  Refuses    records why the cluster refused a launch on a step still reading \`launching\`,
             then deletes the husk so the step can be launched again.
  Charges    reads the tail of a failed step's log and records what kind of infrastructure
             fault the failure is charged to, where the log carries a signature of one.
  Fails fast a step running long enough to judge, burning no cpu and writing no log, is failed
             with exit ${WEDGE_EXIT_CODE} rather than left to run out its clock.

A step's own verdict is not written here: \`sweep-pipeline-pages\` reads the container that exited
and writes \`passed\` or \`failed\` from it. What this writes about a step is what only a reaper
sees — why a launch was refused, what kind of infrastructure fault a failure is charged to, and
the fail-fast on a step burning nothing.

Step and pipeline state are files. It reads them with the page query and writes them to the
gitignored sidecar beside each page, so nothing it writes is committed. Every write is guarded
on the status it read: the status is read again immediately before the write, and a step whose
status has moved is left alone.

The cluster it reaches over the k8s API server directly, and prometheus through that server's
service proxy, because prometheus has no route from outside the cluster.

A tick that has not answered inside ${TICK_CEILING_MS / 1000} seconds ends the process rather
than starting a second one beside it, and systemd restarts it.

It runs until stopped. SIGTERM and SIGINT both end the loop at its next boundary.

Usage:
  bun services/ci-container-reaper.ts
  --help  This.

Environment:
  PIPELINE_SA_TOKEN  Service-account token for the k8s API server. Required.
  K8S_API_BASE       The k8s API server this reaches. Required.
  K8S_CA_CERT_B64    That API server's CA certificate, base64.
  AKASHA_ROOT        The akasha checkout holding the page types and properties.
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
      await runBoundedCiContainerReaperTick(roots, ac.signal)
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

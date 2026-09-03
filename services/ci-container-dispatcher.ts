#!/usr/bin/env bun
export const tool = {
  summary: "Run the CI container dispatcher — place dispatching steps on the cluster on a cadence",
  repos: ["akasha"],
} as const

import { openCluster } from "@akasha/ci-containers/ci-dispatch-cluster"
import { isRecord } from "@akasha/ci-containers/ci-dispatch-shapes"
import {
  DEFAULT_SCAN_LIMIT,
  type DispatcherState,
  initialDispatcherState,
  LOG,
  runBoundedDispatcherTick,
  TICK_CEILING_MS,
  TICK_MS,
} from "@akasha/ci-containers/ci-dispatcher-tick"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { readUncommitted } from "../page/uncommitted/uncommitted.ts"
import { whereFor } from "../tools/lib/page-write-where.ts"

const HELP = `bun services/ci-container-dispatcher.ts — place dispatching steps into containers on the cluster

One workstation process. Every ${TICK_MS / 1000} seconds it reads the step pages standing at
\`dispatching\`, reads what each ci node has room for, decides where each step's container goes,
creates that container on the cluster, and writes the step to \`launching\` beside the name of the
container it was launched in.

Step state is read and written as files: the step, workflow and pipeline pages under the memory
repository, with everything that moves during a run held in each page's uncommitted sidecar. The step
containers themselves stay on the cluster; the cluster is reached over its API server with a
service-account token.

Up to ${DEFAULT_SCAN_LIMIT} dispatching steps are weighed per tick, oldest first within a branch
tier. A tick that has not answered inside ${TICK_CEILING_MS / 1000} seconds ends the process rather
than starting a second one beside it, and systemd restarts it.

It runs until stopped. SIGTERM and SIGINT both end the loop at its next boundary.

Usage:
  bun services/ci-container-dispatcher.ts
  --help  This.

Environment:
  PIPELINE_SA_TOKEN            Service-account token for the k8s API server. Required.
  K8S_API_BASE                 The k8s API server this reaches. Required.
  K8S_CA_CERT_B64              That API server's CA certificate, base64.
  GIT_ACCESS_TOKEN             Handed to each step container so it can fetch what it builds.
  CI_STICKY_PINNING_ENABLED    \`1\` binds a branch pipeline's steps to one node; anything else
                               places each step wherever there is the most room.
`

function sleepAbortable(ms: number, signal: AbortSignal): Promise<boolean> {
  if (signal.aborted) return Promise.resolve(false)
  return new Promise<boolean>((resolve) => {
    const clear = (): undefined => {
      clearTimeout(timer)
      signal.removeEventListener("abort", onAbort)
    }
    const onAbort = (): undefined => {
      clear()
      resolve(false)
    }
    const timer = setTimeout(() => {
      clear()
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

  // A step's definition is a nested record only the markdown page's uncommitted sidecar holds,
  // and every page query flattens it to text. That store stands outside akasha, so the reading
  // is wired here rather than reached for from a module inside it.
  const definitions = (stepSeq: string): Readonly<Record<string, unknown>> => {
    const at = whereFor(roots, "step", stepSeq)
    if (at === null) return {}
    const stated = readUncommitted(at.path)?.definition
    return isRecord(stated) ? stated : {}
  }

  const cluster = await openCluster()
  const gitAccessToken = process.env.GIT_ACCESS_TOKEN ?? ""
  const stickyPinning = process.env.CI_STICKY_PINNING_ENABLED === "1"
  const state: DispatcherState = initialDispatcherState()

  console.log(
    `${LOG} starting tick loop pid=${process.pid} tick=${TICK_MS}ms ceiling=${TICK_CEILING_MS}ms sticky_pinning=${stickyPinning}`
  )

  while (!ac.signal.aborted) {
    const startedAt = Date.now()
    try {
      const report = await runBoundedDispatcherTick(
        { roots, cluster, gitAccessToken, stickyPinning, definitions },
        state,
        ac.signal
      )
      if (report.scanned > 0) {
        const parts = Object.entries(report.timings).map(([name, ms]) => `${name}=${ms}`)
        console.log(
          `${LOG} tick scanned=${report.scanned} admitted=${report.admitted} launched=${report.launched} failed=${report.failed} reserved=${state.ledger.length} elapsed_ms=${Date.now() - startedAt} ${parts.join(" ")}`
        )
      }
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

import { openCluster } from "@akasha/ci-containers/ci-dispatch-cluster"
import {
  type DispatcherState,
  initialDispatcherState,
  LOG,
  runBoundedDispatcherTick,
  TICK_CEILING_MS,
  TICK_MS,
} from "@akasha/ci-containers/ci-dispatcher-tick"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { stepDefinition } from "@tools/lib/step-definition"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "../../../service-system/workstation-services/tick-sleeping/tick-sleeping.module.code.ts"

async function main(): Promise<void> {
  const ac = stopsOnSignal()

  const roots = resolveRoots()
  const definitions = (stepSeq: string): Readonly<Record<string, unknown>> =>
    stepDefinition(roots, stepSeq)
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
    const slept = await sleptUntilStopped(TICK_MS, ac.signal)
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

import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { openCluster } from "@tools/lib/ci-container-dispatcher/cluster"
import {
  type DispatcherState,
  initialDispatcherState,
  LOG,
  runBoundedDispatcherTick,
  TICK_CEILING_MS,
  TICK_MS,
} from "@tools/lib/ci-container-dispatcher/tick"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "../../../service-system/workstation-services/tick-sleeping/tick-sleeping.module.code.ts"

async function main(): Promise<void> {
  const ac = stopsOnSignal()

  const roots = resolveRoots()
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
        { roots, cluster, gitAccessToken, stickyPinning },
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

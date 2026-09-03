import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { CeilingExceeded } from "@tools/lib/sweep-pipeline-pages/ceiling"
import {
  LOG,
  runBoundedSweepTick,
  TICK_CEILING_MS,
  TICK_MS,
} from "@tools/lib/sweep-pipeline-pages/tick"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "../../../service-system/workstation-services/tick-sleeping/tick-sleeping.module.code.ts"

async function main(): Promise<void> {
  const ac = stopsOnSignal()

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

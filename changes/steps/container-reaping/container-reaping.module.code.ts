import { CeilingExceeded } from "@akasha/ci-containers/ci-reaper-ceiling"
import {
  LOG,
  runBoundedCiContainerReaperTick,
  TICK_CEILING_MS,
  TICK_MS,
} from "@akasha/ci-containers/ci-reaper-tick"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
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
    try {
      await runBoundedCiContainerReaperTick(roots, ac.signal)
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

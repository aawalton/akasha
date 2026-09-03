import {
  LOG,
  runBoundedSurplusFallTick,
  TICK_CEILING_MS,
  TICK_MS,
  WORKER_NAME,
} from "@tools/lib/surplus-fall/tick"
import { TICKS_BEFORE_ENDING, tickRatchet } from "@tools/lib/tick-ratchet"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "../../../../service-system/workstation-services/tick-sleeping/tick-sleeping.module.code.ts"

async function main(): Promise<void> {
  const ac = stopsOnSignal()

  console.log(
    `${LOG} starting tick loop pid=${process.pid} tick=${TICK_MS}ms ceiling=${TICK_CEILING_MS}ms`
  )

  const ratchet = tickRatchet(WORKER_NAME, TICKS_BEFORE_ENDING)

  while (!ac.signal.aborted) {
    try {
      await runBoundedSurplusFallTick(WORKER_NAME, ac.signal)
      ratchet.worked()
    } catch (err) {
      if (ac.signal.aborted) break
      console.error(`${LOG} tick threw (${ratchet.threw()} in a row):`, err)
      if (ratchet.spent()) {
        console.error(`${LOG} ${ratchet.why()}`)
        process.exit(1)
      }
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

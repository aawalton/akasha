import {
  LOG,
  runBoundedSurplusFallTick,
  TICK_CEILING_MS,
  TICK_MS,
  WORKER_NAME,
} from "akasha/alan/harness/surplus/fall-ticking/surplus-fall-ticking.module.code.ts"
import {
  TICKS_BEFORE_ENDING,
  tickRatchet,
} from "akasha/infrastructure/services/workstations/tick-ratchet/tick-ratchet.module.code.ts"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "akasha/infrastructure/services/workstations/tick-sleeping/tick-sleeping.module.code.ts"

export async function runSurplusFallNotifying(): Promise<void> {
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
  runSurplusFallNotifying().catch((err) => {
    console.error(`${LOG} fatal:`, err)
    process.exit(1)
  })
}

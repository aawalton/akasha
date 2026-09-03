import { reaperConfigBanner, TICK_MS } from "@tools/lib/memory-reaper-config"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "../../../service-system/workstation-services/tick-sleeping/tick-sleeping.module.code.ts"
import {
  type ReaperState,
  runBoundedReaperTick,
} from "../memory-reaper-tick/memory-reaper-tick.module.code.ts"

async function main(): Promise<void> {
  const ac = stopsOnSignal()

  console.log(reaperConfigBanner())
  console.log(`memory-reaper: starting tick loop pid=${process.pid}`)

  const state: ReaperState = { lastGlobalKillAtMs: null }

  while (!ac.signal.aborted) {
    try {
      await runBoundedReaperTick(state, ac.signal)
    } catch (err) {
      if (!ac.signal.aborted) console.error("memory-reaper: tick threw:", err)
    }
    const slept = await sleptUntilStopped(TICK_MS, ac.signal)
    if (!slept) break
  }

  console.log("memory-reaper: stopping")
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("memory-reaper fatal:", err)
    process.exit(1)
  })
}

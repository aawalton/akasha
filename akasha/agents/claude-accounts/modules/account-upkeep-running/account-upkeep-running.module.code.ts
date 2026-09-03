import { UPKEEP_PERIOD_MS } from "@tools/lib/oauth-constants"
import { lastWindowTriggerAcross, statesFromPages } from "@tools/lib/oauth-page-state"
import { runUpkeepPass } from "@tools/lib/oauth-upkeep"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "../../../../service-system/workstation-services/tick-sleeping/tick-sleeping.module.code.ts"

const LOG = "[claude-account-upkeep]"
const TICK_INTERVAL_MS = UPKEEP_PERIOD_MS

async function computeStartupDelayMs(): Promise<number> {
  try {
    const lastTriggerMs = lastWindowTriggerAcross(statesFromPages().values())
    if (lastTriggerMs === null) return 0
    if (!Number.isFinite(lastTriggerMs)) return 0
    const msSince = Date.now() - lastTriggerMs
    if (!Number.isFinite(msSince) || msSince < 0) return 0
    if (msSince >= TICK_INTERVAL_MS) return 0
    return TICK_INTERVAL_MS - msSince
  } catch (err) {
    console.warn(`${LOG} startup-delay query failed; ticking immediately:`, err)
    return 0
  }
}

async function main(): Promise<void> {
  const ac = stopsOnSignal()

  console.log(`${LOG} starting tick loop pid=${process.pid} tick=${TICK_INTERVAL_MS}ms`)

  const startupDelay = await computeStartupDelayMs()
  if (startupDelay > 0) {
    console.log(
      `${LOG} startup delay ${Math.round(startupDelay / 1000)}s — ` +
        "a window was triggered inside the hour, deferring"
    )
    const waited = await sleptUntilStopped(startupDelay, ac.signal)
    if (!waited) {
      console.log(`${LOG} stopping`)
      return
    }
  }

  while (!ac.signal.aborted) {
    try {
      await runUpkeepPass(LOG)
    } catch (err) {
      if (!ac.signal.aborted) console.error(`${LOG} tick threw:`, err)
    }
    const slept = await sleptUntilStopped(TICK_INTERVAL_MS, ac.signal)
    if (!slept) break
  }

  console.log(`${LOG} stopping`)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error("claude-account-upkeep fatal:", err)
    process.exit(1)
  })
}

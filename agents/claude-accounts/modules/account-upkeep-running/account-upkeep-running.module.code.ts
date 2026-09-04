import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "../../../../service-system/workstation-services/tick-sleeping/tick-sleeping.module.code.ts"
import { UPKEEP_PERIOD_MS } from "../oauth/claude-account-oauth.module.code.ts"
import {
  everyAccountStateIn,
  lastWindowTriggerAcross,
} from "../reading/claude-account-reading.module.code.ts"
import { DOORS, upkeepPassIn } from "../upkeep/claude-account-upkeep.module.code.ts"

const LOG = "[claude-account-upkeep]"
const TICK_INTERVAL_MS = UPKEEP_PERIOD_MS

const MS_A_SECOND = 1000

async function computeStartupDelayMs(root: string): Promise<number> {
  try {
    const lastTriggerMs = lastWindowTriggerAcross(everyAccountStateIn(root).values())
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
  const root = rootFor(resolveRoots(), AKASHA)
  const ac = stopsOnSignal()

  console.log(`${LOG} starting tick loop pid=${process.pid} tick=${TICK_INTERVAL_MS}ms`)

  const startupDelay = await computeStartupDelayMs(root)
  if (startupDelay > 0) {
    console.log(
      `${LOG} startup delay ${Math.round(startupDelay / MS_A_SECOND)}s — ` +
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
      await upkeepPassIn({ root, doors: DOORS, logPrefix: LOG })
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

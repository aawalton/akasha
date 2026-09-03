import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { computePacingDerivations, formatPaceHours } from "@akasha/agents/claude-account-pacing"
import { accountStateIn } from "@akasha/agents/claude-account-reading"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { LOG } from "../supervisor-config/supervisor-config.module.code.ts"

export function writePacingSnapshot(account: string, configDir: string): void {
  try {
    const root = rootFor(resolveRoots(), AKASHA)
    const state = accountStateIn(root, account)
    const sevenDayUtilization = state === null ? null : state.sevenDayPercentUsed
    const sevenDayResetsAt = state?.sevenDayResetsAt ?? null
    const fiveHourResetsAt = state?.fiveHourResetsAt ?? null
    const derived = computePacingDerivations({
      now: Date.now(),
      sevenDayUtil: sevenDayUtilization ?? 0,
      sevenDayResetsAt,
      fiveHourResetsAt,
    })
    const paceHoursDiff = sevenDayUtilization == null ? null : derived.paceHoursDiff
    const paceHoursFormatted = paceHoursDiff == null ? null : formatPaceHours(paceHoursDiff)
    const path = join(configDir, ".pacing.json")
    const snapshot = {
      account,
      fiveHourUtilization: state === null ? null : state.fiveHourPercentUsed,
      fiveHourResetsAt,
      sevenDayUtilization,
      sevenDayResetsAt,
      paceHoursDiff,
      paceHoursFormatted,
      updatedAt: new Date().toISOString(),
    }
    writeFileSync(path, JSON.stringify(snapshot), { mode: 0o600 })
  } catch (err) {
    console.error(`${LOG} writePacingSnapshot(${account}) failed:`, err)
  }
}

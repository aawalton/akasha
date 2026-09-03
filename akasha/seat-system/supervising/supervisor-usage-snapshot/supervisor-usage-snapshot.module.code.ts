import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { instantOf } from "@tools/lib/oauth-page-db"
import { accountStateFromPage } from "@tools/lib/oauth-page-state"
import { computePacingDerivations, formatPaceHours } from "@tools/lib/usage-derivations"
import { LOG } from "../supervisor-config/supervisor-config.module.code.ts"

export function writePacingSnapshot(account: string, configDir: string): void {
  try {
    const state = accountStateFromPage(account)
    const sevenDayUtilization = state === null ? null : state.sevenDayUtil
    const sevenDayResetsAt = instantOf(state?.sevenDayResetsAt ?? null)
    const fiveHourResetsAt = instantOf(state?.fiveHourResetsAt ?? null)
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
      fiveHourUtilization: state === null ? null : state.fiveHourUtil,
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

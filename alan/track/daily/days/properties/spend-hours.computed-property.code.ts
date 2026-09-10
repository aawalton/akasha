import type { Work } from "@akasha/pages/computed-property"
import type { WorkedDay } from "../day.page-type.worked.ts"
import {
  gapIn,
  multiplierFor,
} from "../modules/cost-multiplier/cost-multiplier.computed-property-module.code.ts"
import { hoursBetween } from "../modules/hours-between/hours-between.computed-property-module.code.ts"

export const work: Work<WorkedDay, number> = (page) => {
  const rows = page.sessions
  if (!Array.isArray(rows)) return null
  const now = new Date().toISOString()
  let hours = 0
  for (const row of rows) {
    const ran = hoursBetween(row.startTime, row.endTime) ?? hoursBetween(row.startTime, now)
    if (ran === null) continue
    hours += ran * multiplierFor(gapIn(row))
  }
  return hours
}

import type { WorkedDay } from "akasha/alan/track/daily/days/day.page-type.ts"
import {
  gapIn,
  multiplierFor,
} from "akasha/alan/track/daily/days/modules/cost-multiplier/cost-multiplier.computed-property-module.code.ts"
import { hoursBetween } from "akasha/alan/track/daily/days/modules/hours-between/hours-between.computed-property-module.code.ts"
import type { SpendHours } from "akasha/alan/track/daily/days/properties/spend-hours.computed-property.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<WorkedDay, SpendHours> = (page) => {
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

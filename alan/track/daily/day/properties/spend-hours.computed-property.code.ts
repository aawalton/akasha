import type { WorkedDay } from "akasha/alan/track/daily/day/day.page-type.ts"
import {
  gapIn,
  multiplierFor,
} from "akasha/alan/track/daily/day/modules/cost-multiplier/cost-multiplier.computed-property-module.code.ts"
import {
  openUntil,
  stretchHours,
} from "akasha/alan/track/daily/day/modules/stretch-hours/stretch-hours.computed-property-module.code.ts"
import type { SpendHours } from "akasha/alan/track/daily/day/properties/spend-hours.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<WorkedDay, SpendHours> = (page) => {
  const rows = page.sessions
  if (!Array.isArray(rows)) return null
  const until = openUntil(page.date)
  let hours = 0
  for (const row of rows) {
    const ran = stretchHours(row.startTime, row.endTime, until)
    if (ran === null) continue
    hours += ran * multiplierFor(gapIn(row))
  }
  return hours
}

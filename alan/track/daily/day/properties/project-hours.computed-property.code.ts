import type { WorkedDay } from "akasha/alan/track/daily/day/day.page-type.ts"
import {
  openUntil,
  stretchHours,
} from "akasha/alan/track/daily/day/modules/stretch-hours/stretch-hours.computed-property-module.code.ts"
import type { ProjectHours } from "akasha/alan/track/daily/day/properties/project-hours.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

const SAYS_PROJECTS = /\bprojects\b/iu

export const work: Work<WorkedDay, ProjectHours> = (page) => {
  const rows = page.sessions
  if (!Array.isArray(rows)) return null
  const until = openUntil(page.date)
  let hours = 0
  for (const row of rows) {
    if (typeof row.title !== "string" || !SAYS_PROJECTS.test(row.title)) continue
    hours += stretchHours(row.startTime, row.endTime, until) ?? 0
  }
  return hours
}

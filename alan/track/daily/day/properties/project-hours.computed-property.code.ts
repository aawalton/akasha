import type { WorkedDay } from "akasha/alan/track/daily/day/day.page-type.ts"
import type { ProjectHours } from "akasha/alan/track/daily/day/properties/project-hours.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

const AN_HOUR = 3600000

const SAYS_PROJECTS = /\bprojects\b/iu

export const work: Work<WorkedDay, ProjectHours> = (page) => {
  const rows = page.sessions
  if (!Array.isArray(rows)) return null
  const now = Date.now()
  let spanned = 0
  for (const row of rows) {
    if (typeof row.title !== "string" || !SAYS_PROJECTS.test(row.title)) continue
    if (typeof row.startTime !== "string") continue
    const opened = Date.parse(row.startTime)
    const closed = typeof row.endTime === "string" ? Date.parse(row.endTime) : now
    if (Number.isNaN(opened) || Number.isNaN(closed)) continue
    spanned += Math.max(0, closed - opened)
  }
  return spanned / AN_HOUR
}

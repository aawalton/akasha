import type { WorkedDay } from "akasha/alan/track/daily/day/day.page-type.ts"
import type { LearnStoplight } from "akasha/alan/track/daily/day/properties/learn-stoplight.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<WorkedDay, LearnStoplight> = (page) => {
  const level = page.learnLevel
  if (level === 4) return "🔵"
  if (level === 3) return "🟢"
  if (level === 2) return "🟡"
  if (level === 1) return "🔴"
  return "⚫"
}

import type { Day } from "akasha/alan/track/daily/days/day.page-type.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<Day, number> = (page) => {
  const points = page.learnPoints ?? 0
  if (points >= 2) return 4
  if (points >= 1) return 3
  if (points >= 0.5) return 2
  if (points >= 0.25) return 1
  return 0
}

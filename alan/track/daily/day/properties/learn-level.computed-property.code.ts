import type { Day } from "akasha/alan/track/daily/day/day.page-type.types.ts"
import type { LearnLevel } from "akasha/alan/track/daily/day/properties/learn-level.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<Day, LearnLevel> = (page) => {
  const points = page.learnPoints ?? 0
  if (points >= 2) return 4
  if (points >= 1) return 3
  if (points >= 0.5) return 2
  if (points >= 0.25) return 1
  return 0
}

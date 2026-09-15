import type { Day } from "akasha/alan/track/daily/day/day.page-type.types.ts"
import type { HealthLevel } from "akasha/alan/track/daily/day/properties/health-level.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<Day, HealthLevel> = (page) => {
  const points = page.healthPoints ?? 0
  if (points >= 2) return 4
  if (points >= 1) return 3
  if (points >= 0.5) return 2
  if (points >= 0.25) return 1
  return 0
}

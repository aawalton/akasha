import type { Work } from "@akasha/pages/computed-property"
import type { Day } from "../day.page-type.types.ts"

export const work: Work<Day, number> = (page) => {
  const points = page.healthPoints ?? 0
  if (points >= 2) return 4
  if (points >= 1) return 3
  if (points >= 0.5) return 2
  if (points >= 0.25) return 1
  return 0
}

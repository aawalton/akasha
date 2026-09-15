import type { WorkedDay } from "akasha/alan/track/daily/day/day.page-type.ts"
import type { SurplusHours } from "akasha/alan/track/daily/day/properties/surplus-hours.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<WorkedDay, SurplusHours> = (page) => {
  const sleep = page.sleepHours
  const spend = page.spendHours
  if (typeof sleep !== "number" && typeof spend !== "number") return null
  return (typeof sleep === "number" ? sleep : 0) - (typeof spend === "number" ? spend : 0)
}

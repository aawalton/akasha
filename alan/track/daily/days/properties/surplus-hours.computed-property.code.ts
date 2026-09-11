import type { WorkedDay } from "akasha/alan/track/daily/days/day.page-type.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<WorkedDay, number> = (page) => {
  const sleep = page.sleepHours
  const spend = page.spendHours
  if (typeof sleep !== "number" && typeof spend !== "number") return null
  return (typeof sleep === "number" ? sleep : 0) - (typeof spend === "number" ? spend : 0)
}

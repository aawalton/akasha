import type { Work } from "@akasha/pages/computed-property"
import type { WorkedDay } from "../day.page-type.worked.ts"

export const work: Work<WorkedDay, number> = (page) => {
  const sleep = page.sleepHours
  const spend = page.spendHours
  if (typeof sleep !== "number" && typeof spend !== "number") return null
  return (typeof sleep === "number" ? sleep : 0) - (typeof spend === "number" ? spend : 0)
}

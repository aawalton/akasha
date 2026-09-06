import type { Work } from "@akasha/pages/computed-property"
import type { WorkedWakeDay } from "../wake-day.page-type.worked.ts"

export const work: Work<WorkedWakeDay, number> = (page) => {
  const sleep = page.sleepHours
  const spend = page.spendHours
  // A day holding neither sleep nor spend is no reading rather than a surplus of nothing.
  if (typeof sleep !== "number" && typeof spend !== "number") return null
  return (typeof sleep === "number" ? sleep : 0) - (typeof spend === "number" ? spend : 0)
}

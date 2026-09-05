import type { Work } from "@akasha/pages-system/computed-property"
import type { WorkedWakeDay } from "../wake-day.page-type.ts"

export const work: Work<WorkedWakeDay, string> = (page) => {
  const level = page.wealthLevel
  if (level === 4) return "🔵"
  if (level === 3) return "🟢"
  if (level === 2) return "🟡"
  if (level === 1) return "🔴"
  return "⚫"
}

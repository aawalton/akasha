import type { Work } from "@akasha/pages/computed-property"
import type { WorkedDay } from "../day.page-type.worked.ts"

export const work: Work<WorkedDay, string> = (page) => {
  const level = page.funLevel
  if (level === 4) return "🔵"
  if (level === 3) return "🟢"
  if (level === 2) return "🟡"
  if (level === 1) return "🔴"
  return "⚫"
}

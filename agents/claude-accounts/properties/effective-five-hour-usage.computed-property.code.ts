import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"
import type { WorkedClaudeAccount } from "../claude-account.page-type.worked.ts"

const CEILING = 100

function fiveHourSpentIn(page: WorkedClaudeAccount): number | null {
  const said: unknown = page.fiveHourPercentUsed
  if (typeof said === "number") return Number.isFinite(said) ? said : null
  if (typeof said !== "string" || said === "") return null
  const found = Number(said)
  return Number.isFinite(found) ? found : null
}

export const work: Work<WorkedClaudeAccount, number> = (page) => {
  const seven = page.effectiveSevenDayUsage
  if (seven !== undefined && seven >= CEILING) return CEILING
  return fiveHourSpentIn(page)
}

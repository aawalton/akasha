import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"
import type { WorkedClaudeAccount } from "../claude-account.page-type.worked.ts"

const CEILING = 100

function withdrawn(said: unknown): boolean {
  return typeof said === "string" && said !== ""
}

function sevenDaySpentIn(page: WorkedClaudeAccount): number | null {
  const said: unknown = page.sevenDayPercentUsed
  if (typeof said === "number") return Number.isFinite(said) ? said : null
  if (typeof said !== "string" || said === "") return null
  const found = Number(said)
  return Number.isFinite(found) ? found : null
}

export const work: Work<WorkedClaudeAccount, number> = (page) => {
  if (withdrawn(page.subscriptionDisabledReason)) return CEILING
  return sevenDaySpentIn(page)
}

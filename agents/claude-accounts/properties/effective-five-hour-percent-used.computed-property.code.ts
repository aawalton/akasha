import type { Work } from "@akasha/pages/computed-property"
import type { WorkedClaudeAccount } from "../claude-account.page-type.worked.ts"

const CEILING = 100

function withdrawn(said: unknown): boolean {
  return typeof said === "string" && said !== ""
}

function percentIn(said: unknown): number | null {
  if (typeof said === "number") return Number.isFinite(said) ? said : null
  if (typeof said !== "string" || said === "") return null
  const found = Number(said)
  return Number.isFinite(found) ? found : null
}

export const work: Work<WorkedClaudeAccount, number> = (page) => {
  if (withdrawn(page.subscriptionDisabledReason)) return CEILING
  const seven = percentIn(page.sevenDayPercentUsed)
  if (seven !== null && seven >= CEILING) return CEILING
  return percentIn(page.fiveHourPercentUsed)
}

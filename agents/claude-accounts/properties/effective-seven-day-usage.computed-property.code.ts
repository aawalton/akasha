import type { ClaudeAccount } from "akasha/agents/claude-accounts/claude-account.page-type.types.ts"
import type { EffectiveSevenDayUsage } from "akasha/agents/claude-accounts/properties/effective-seven-day-usage.computed-property.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

const CEILING = 100

function withdrawn(said: unknown): boolean {
  return typeof said === "string" && said !== ""
}

function sevenDaySpentIn(page: ClaudeAccount): number | null {
  const said: unknown = page.sevenDayPercentUsed
  if (typeof said === "number") return Number.isFinite(said) ? said : null
  if (typeof said !== "string" || said === "") return null
  const found = Number(said)
  return Number.isFinite(found) ? found : null
}

export const work: Work<ClaudeAccount, EffectiveSevenDayUsage> = (page) => {
  if (withdrawn(page.subscriptionDisabledReason)) return CEILING
  return sevenDaySpentIn(page)
}

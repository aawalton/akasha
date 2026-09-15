import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"
import type { EffectiveSevenDayUsage } from "akasha/agent/model/account/properties/effective-seven-day-usage.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

const CEILING = 100

function withdrawn(said: unknown): boolean {
  return typeof said === "string" && said !== ""
}

function sevenDaySpentIn(page: ModelAccount): number | null {
  const said: unknown = page.sevenDayPercentUsed
  if (typeof said === "number") return Number.isFinite(said) ? said : null
  if (typeof said !== "string" || said === "") return null
  const found = Number(said)
  return Number.isFinite(found) ? found : null
}

export const work: Work<ModelAccount, EffectiveSevenDayUsage> = (page) => {
  if (withdrawn(page.subscriptionDisabledReason)) return CEILING
  return sevenDaySpentIn(page)
}

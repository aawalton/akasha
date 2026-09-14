import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"
import type { EffectiveFiveHourUsage } from "akasha/agent/model/account/properties/effective-five-hour-usage.computed-property.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

const CEILING = 100

function fiveHourSpentIn(page: ModelAccount): number | null {
  const said: unknown = page.fiveHourPercentUsed
  if (typeof said === "number") return Number.isFinite(said) ? said : null
  if (typeof said !== "string" || said === "") return null
  const found = Number(said)
  return Number.isFinite(found) ? found : null
}

export const work: Work<ModelAccount, EffectiveFiveHourUsage> = (page) => {
  const seven = page.effectiveSevenDayUsage
  if (seven !== undefined && seven >= CEILING) return CEILING
  return fiveHourSpentIn(page)
}

import type { ModelAccount } from "akasha/agent/model/account/model-account.page-type.types.ts"
import { fiveHourResetIn } from "akasha/agent/model/account/modules/five-hour-reset/five-hour-reset.computed-property-module.code.ts"
import type { EffectiveFiveHourResetsAt } from "akasha/agent/model/account/properties/effective-five-hour-resets-at.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<ModelAccount, EffectiveFiveHourResetsAt> = (page) =>
  fiveHourResetIn(page.effectiveSevenDayUsage ?? null, page.fiveHourResetsAt)

import type { ClaudeAccount } from "akasha/agents/claude-accounts/claude-account.page-type.types.ts"
import { fiveHourResetIn } from "akasha/agents/claude-accounts/modules/five-hour-reset/five-hour-reset.computed-property-module.code.ts"
import type { EffectiveFiveHourResetsAt } from "akasha/agents/claude-accounts/properties/effective-five-hour-resets-at.computed-property.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<ClaudeAccount, EffectiveFiveHourResetsAt> = (page) =>
  fiveHourResetIn(page.effectiveSevenDayUsage ?? null, page.fiveHourResetsAt)

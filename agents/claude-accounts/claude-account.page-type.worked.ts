import type { ClaudeAccount } from "./claude-account.page-type.ts"
import type { EffectiveFiveHourPercentUsed } from "./properties/effective-five-hour-percent-used.computed-property.ts"
import type { EffectiveSevenDayPercentUsed } from "./properties/effective-seven-day-percent-used.computed-property.ts"

export type WorkedClaudeAccount = ClaudeAccount & {
  effectiveFiveHourPercentUsed?: EffectiveFiveHourPercentUsed
  effectiveSevenDayPercentUsed?: EffectiveSevenDayPercentUsed
}

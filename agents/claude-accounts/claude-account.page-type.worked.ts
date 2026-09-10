import type { ClaudeAccount } from "./claude-account.page-type.types.ts"
import type { EffectiveFiveHourUsage } from "./properties/effective-five-hour-usage.computed-property.ts"
import type { EffectiveSevenDayUsage } from "./properties/effective-seven-day-usage.computed-property.ts"

export type WorkedClaudeAccount = ClaudeAccount & {
  effectiveFiveHourUsage?: EffectiveFiveHourUsage
  effectiveSevenDayUsage?: EffectiveSevenDayUsage
}

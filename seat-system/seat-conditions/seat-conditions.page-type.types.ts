import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { AutoCompactWindow } from "akasha/seat-system/seat-conditions/properties/auto-compact-window.number-property.types.ts"
import type { EffortLevel } from "akasha/seat-system/seat-conditions/properties/effort-level.text-property.types.ts"
import type { ExtendedContextAvailable } from "akasha/seat-system/seat-conditions/properties/extended-context-available.boolean-property.types.ts"
import type { FallbackModel } from "akasha/seat-system/seat-conditions/properties/fallback-model.text-property.types.ts"
import type { ResumeThresholdMinutes } from "akasha/seat-system/seat-conditions/properties/resume-threshold-minutes.number-property.types.ts"
import type { ResumeTokenThreshold } from "akasha/seat-system/seat-conditions/properties/resume-token-threshold.number-property.types.ts"
import type { SeatConditionsModel } from "akasha/seat-system/seat-conditions/properties/seat-conditions-model.text-property.types.ts"
import type { SubagentModel } from "akasha/seat-system/seat-conditions/properties/subagent-model.text-property.types.ts"
import type { SubagentSpawnDepth } from "akasha/seat-system/seat-conditions/properties/subagent-spawn-depth.number-property.types.ts"
import type { ToolTimeout } from "akasha/seat-system/seat-conditions/properties/tool-timeout.number-property.types.ts"

export type SeatConditions = Page & {
  model?: SeatConditionsModel
  subagentModel?: SubagentModel
  fallbackModel?: FallbackModel
  autoCompactWindow?: AutoCompactWindow
  effortLevel?: EffortLevel
  subagentSpawnDepth?: SubagentSpawnDepth
  toolTimeout?: ToolTimeout
  resumeThresholdMinutes?: ResumeThresholdMinutes
  resumeTokenThreshold?: ResumeTokenThreshold
  extendedContextAvailable?: ExtendedContextAvailable
}

import type { AutoCompactWindow } from "akasha/agents/seats/conditions/properties/auto-compact-window.number-property.types.ts"
import type { EffortLevel } from "akasha/agents/seats/conditions/properties/effort-level.text-property.types.ts"
import type { ExtendedContextAvailable } from "akasha/agents/seats/conditions/properties/extended-context-available.boolean-property.types.ts"
import type { FallbackModel } from "akasha/agents/seats/conditions/properties/fallback-model.text-property.types.ts"
import type { ResumeThresholdMinutes } from "akasha/agents/seats/conditions/properties/resume-threshold-minutes.number-property.types.ts"
import type { ResumeTokenThreshold } from "akasha/agents/seats/conditions/properties/resume-token-threshold.number-property.types.ts"
import type { SeatConditionsModel } from "akasha/agents/seats/conditions/properties/seat-conditions-model.text-property.types.ts"
import type { SubagentModel } from "akasha/agents/seats/conditions/properties/subagent-model.text-property.types.ts"
import type { SubagentSpawnDepth } from "akasha/agents/seats/conditions/properties/subagent-spawn-depth.number-property.types.ts"
import type { ToolTimeout } from "akasha/agents/seats/conditions/properties/tool-timeout.number-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

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

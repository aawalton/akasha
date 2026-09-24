import type { AutoCompactWindow } from "akasha/agent/seat/conditions/properties/auto-compact-window.number-property.types.ts"
import type { EffortLevel } from "akasha/agent/seat/conditions/properties/effort-level.text-property.types.ts"
import type { ExtendedContextAvailable } from "akasha/agent/seat/conditions/properties/extended-context-available.boolean-property.types.ts"
import type { IdleCompactWindow } from "akasha/agent/seat/conditions/properties/idle-compact-window.number-property.types.ts"
import type { ResumeThresholdMinutes } from "akasha/agent/seat/conditions/properties/resume-threshold-minutes.number-property.types.ts"
import type { ResumeTokenThreshold } from "akasha/agent/seat/conditions/properties/resume-token-threshold.number-property.types.ts"
import type { SeatConditionsModel } from "akasha/agent/seat/conditions/properties/seat-conditions-model.text-property.types.ts"
import type { SubagentModel } from "akasha/agent/seat/conditions/properties/subagent-model.text-property.types.ts"
import type { SubagentSpawnDepth } from "akasha/agent/seat/conditions/properties/subagent-spawn-depth.number-property.types.ts"
import type { ToolTimeout } from "akasha/agent/seat/conditions/properties/tool-timeout.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type SeatConditions = Page & {
  model?: SeatConditionsModel
  subagentModel?: SubagentModel
  autoCompactWindow?: AutoCompactWindow
  effortLevel?: EffortLevel
  subagentSpawnDepth?: SubagentSpawnDepth
  toolTimeout?: ToolTimeout
  resumeThresholdMinutes?: ResumeThresholdMinutes
  resumeTokenThreshold?: ResumeTokenThreshold
  extendedContextAvailable?: ExtendedContextAvailable
  idleCompactWindow?: IdleCompactWindow
}

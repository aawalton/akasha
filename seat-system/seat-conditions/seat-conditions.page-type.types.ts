import type { Page } from "../../pages/page.page-type.types.ts"
import type { AutoCompactWindow } from "./properties/auto-compact-window.number-property.ts"
import type { EffortLevel } from "./properties/effort-level.text-property.ts"
import type { ExtendedContextAvailable } from "./properties/extended-context-available.boolean-property.ts"
import type { FallbackModel } from "./properties/fallback-model.text-property.ts"
import type { ResumeThresholdMinutes } from "./properties/resume-threshold-minutes.number-property.ts"
import type { ResumeTokenThreshold } from "./properties/resume-token-threshold.number-property.ts"
import type { SeatConditionsModel } from "./properties/seat-conditions-model.text-property.ts"
import type { SubagentModel } from "./properties/subagent-model.text-property.ts"
import type { SubagentSpawnDepth } from "./properties/subagent-spawn-depth.number-property.ts"
import type { ToolTimeout } from "./properties/tool-timeout.number-property.ts"

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

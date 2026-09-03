import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
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

export const seatConditions = {
  id: "01a06837-f101-7420-89ad-7e146f4cbaf5",
  pageTypeSlug: "page-type",
  slug: "seat-conditions",
  definition: "what a seat settles for an agent before the agent starts working there",
  pluralSlug: "seat-conditions-documents",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/extended-context-available",
    "number-property/auto-compact-window",
    "number-property/resume-threshold-minutes",
    "number-property/resume-token-threshold",
    "number-property/subagent-spawn-depth",
    "number-property/tool-timeout",
    "text-property/effort-level",
    "text-property/fallback-model",
    "text-property/seat-conditions-model",
    "text-property/subagent-model",
  ],
  properties: [
    { pagePropertySlug: "seat-conditions-model", required: false, many: false, default: "opus" },
    { pagePropertySlug: "subagent-model", required: false, many: false },
    { pagePropertySlug: "fallback-model", required: false, many: false },
    { pagePropertySlug: "auto-compact-window", required: false, many: false, default: "400000" },
    { pagePropertySlug: "effort-level", required: false, many: false },
    { pagePropertySlug: "subagent-spawn-depth", required: false, many: false, default: "5" },
    { pagePropertySlug: "tool-timeout", required: false, many: false, default: "600000" },
    {
      pagePropertySlug: "resume-threshold-minutes",
      required: false,
      many: false,
      default: "2147483647",
    },
    {
      pagePropertySlug: "resume-token-threshold",
      required: false,
      many: false,
      default: "2147483647",
    },
    {
      pagePropertySlug: "extended-context-available",
      required: false,
      many: false,
      default: "false",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page carries what a seat settles, and there is never a second.",
    },
    {
      invariantKind: "departure",
      statement: "A second page standing is read as neither of them holding.",
    },
    {
      invariantKind: "departure",
      statement: "A condition stated as `none` is read as unstated.",
    },
    {
      invariantKind: "departure",
      statement: "A condition nobody stated is that condition's default.",
    },
    {
      invariantKind: "departure",
      statement: "The page carrying these states every condition rather than leaning on a default.",
    },
    {
      invariantKind: "gap",
      statement: "Every reader of these conditions reads them from akasha.",
    },
  ],
} as const satisfies PageType

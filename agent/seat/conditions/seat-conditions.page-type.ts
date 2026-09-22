import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const seatConditions = {
  id: "01a06837-f101-7420-89ad-7e146f4cbaf5",
  type: "page-type/page-type",
  slug: "seat-conditions",
  definition: "what a seat settles for an agent before the agent starts working there",
  extends: ["page-type/page"],
  parts: [
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
    "number-property/idle-compact-window",
  ],
  properties: [
    {
      pageProperty: "text-property/seat-conditions-model",
      required: false,
      many: false,
      default: "opus",
    },
    { pageProperty: "text-property/subagent-model", required: false, many: false },
    { pageProperty: "text-property/fallback-model", required: false, many: false },
    {
      pageProperty: "number-property/auto-compact-window",
      required: false,
      many: false,
      default: "400000",
    },
    { pageProperty: "text-property/effort-level", required: false, many: false },
    {
      pageProperty: "number-property/subagent-spawn-depth",
      required: false,
      many: false,
      default: "5",
    },
    {
      pageProperty: "number-property/tool-timeout",
      required: false,
      many: false,
      default: "600000",
    },
    {
      pageProperty: "number-property/resume-threshold-minutes",
      required: false,
      many: false,
      default: "2147483647",
    },
    {
      pageProperty: "number-property/resume-token-threshold",
      required: false,
      many: false,
      default: "2147483647",
    },
    {
      pageProperty: "boolean-property/extended-context-available",
      required: false,
      many: false,
      default: "false",
    },
    {
      pageProperty: "number-property/idle-compact-window",
      required: false,
      many: false,
      default: "350000",
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One page has a seat's conditions.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "There is never a second page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second page there is taken as no page holding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition stated as `none` is taken as unstated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition nobody stated is that condition's default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page with these states every condition rather than leaning on a default.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every reader of these conditions reads these conditions from akasha.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

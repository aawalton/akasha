import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const climbFloor = {
  id: "01a0f953-d88d-75ad-99c3-5a6db47c8f61",
  type: "page-type/page-type",
  slug: "climb-floor",
  definition: "one floor of The Climb, its staging and the task it sets the climbers on it",
  pluralSlug: "floors",
  extends: ["page-type/world-quest"],
  runsTabooCheck: false,
  parts: [
    "relation-property/climb-floor-character",
    "text-property/climb-floor-task",
    "select-property/climb-floor-status",
  ],
  properties: [
    { pageProperty: "relation-property/climb-floor-character", required: true, many: false },
    { pageProperty: "text-property/climb-floor-task", required: true, many: false },
    { pageProperty: "select-property/climb-floor-status", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A floor is titled by its number and its staging, as in Floor 1: The Bathhouse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A floor is complete once its task is met and its stairs open.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

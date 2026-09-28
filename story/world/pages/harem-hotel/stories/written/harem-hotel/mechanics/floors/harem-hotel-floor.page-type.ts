import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelFloor = {
  id: "01a0e822-39b3-7bc0-be8e-4a7093388b67",
  type: "page-type/page-type",
  slug: "harem-hotel-floor",
  definition: "one floor of the Harem Hotel, its staging and the task it sets Alan",
  pluralSlug: "floors",
  extends: ["page-type/world-quest"],
  runsTabooCheck: false,
  parts: [
    "relation-property/harem-hotel-floor-character",
    "text-property/harem-hotel-floor-task",
    "select-property/harem-hotel-floor-status",
  ],
  properties: [
    { pageProperty: "relation-property/harem-hotel-floor-character", required: true, many: false },
    { pageProperty: "text-property/harem-hotel-floor-task", required: true, many: false },
    { pageProperty: "select-property/harem-hotel-floor-status", required: true, many: false },
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

import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelQuest = {
  id: "01a0de28-77bb-796d-af85-94d93978aa26",
  type: "page-type/page-type",
  slug: "harem-hotel-quest",
  definition: "a piece of work the Harem Hotel sets one character",
  pluralSlug: "quests",
  extends: ["page-type/world-quest"],
  runsTabooCheck: false,
  parts: [
    "relation-property/harem-hotel-quest-character",
    "text-property/harem-hotel-quest-objective",
    "text-property/harem-hotel-quest-reward",
    "select-property/harem-hotel-quest-status",
  ],
  properties: [
    { pageProperty: "relation-property/harem-hotel-quest-character", required: true, many: false },
    { pageProperty: "text-property/harem-hotel-quest-objective", required: true, many: false },
    { pageProperty: "text-property/harem-hotel-quest-reward", required: false, many: false },
    { pageProperty: "select-property/harem-hotel-quest-status", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperAntiquityCategory = {
  id: "01a06166-503c-7000-a696-166a5a6ce1df",
  type: "page-type/page-type",
  slug: "temper-antiquity-category",
  definition: "a grouping of the game's antiquity lore",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [
    "number-property/eso-antiquity-category-id",
    "number-property/eso-antiquity-id",
    "number-property/total-lore-entries",
    "page-property-entry/antiquities",
    "relation-property/antiquity-set",
    "text-property/antiquity-name",
  ],
  properties: [
    { pageProperty: "number-property/eso-antiquity-category-id", required: true, many: false },
    { pageProperty: "page-property-entry/antiquities", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category is numbered in a key space of its own rather than by zone.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

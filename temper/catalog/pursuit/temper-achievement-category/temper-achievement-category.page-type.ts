import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperAchievementCategory = {
  id: "01a06168-7245-7000-bc3b-b40339a88d31",
  type: "page-type/page-type",
  slug: "temper-achievement-category",
  definition: "a game heading over a player's achievements",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [
    "number-property/achievement-points",
    "number-property/eso-achievement-id",
    "number-property/total-steps",
    "page-property-entry/achievements",
    "relation-property/achievement-category-parent",
  ],
  properties: [
    { pageProperty: "text-property/category", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "page-property-entry/achievements", required: false, many: false },
    { pageProperty: "relation-property/achievement-category-parent", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A heading stating a parent is a subcategory of the heading the parent names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heading has the achievements the game files directly under that heading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The category tells apart the account tally from the character tally.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCollectibleCategory = {
  id: "01a06165-ae0e-7003-b36d-6529ae625fb0",
  type: "page-type/page-type",
  slug: "temper-collectible-category",
  definition: "a game heading over a collectible",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [
    "number-property/eso-category-index",
    "page-property-entry/collectibles",
    "text-property/collectible-name",
  ],
  properties: [
    { pageProperty: "number-property/eso-category-index", required: false, many: false },
    { pageProperty: "page-property-entry/collectibles", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category stating no parent has the category index the game gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category stating a parent hangs beneath the category the parent names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collectible a category has is a line of the file beside the page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

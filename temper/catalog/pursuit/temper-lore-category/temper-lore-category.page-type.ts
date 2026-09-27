import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperLoreCategory = {
  id: "01a0e24d-a074-7b52-8c2b-ca22b1ddf1e0",
  type: "page-type/page-type",
  slug: "temper-lore-category",
  definition: "a category of the game's lore library, holding lore collections",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [],
  properties: [
    { pageProperty: "number-property/eso-lore-category-id", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A lore collection names its category by the category's number.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

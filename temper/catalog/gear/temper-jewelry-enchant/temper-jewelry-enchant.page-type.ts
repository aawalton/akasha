import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperJewelryEnchant = {
  id: "01a05fd1-d432-7bca-b936-c66974cf77aa",
  type: "page-type/page-type",
  slug: "temper-jewelry-enchant",
  definition: "a glyph put on a piece of jewelry",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/eso-enchant-constant-name", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
    { pageProperty: "number-property/eso-enchant-search-category", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An enchant's hash place is the index a build hash has for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An enchant's effects state its legendary worth, and its grades state each quality.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType

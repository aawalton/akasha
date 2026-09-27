import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperWeaponEnchant = {
  id: "01a05fd1-d441-7e40-89d2-1fcb87133420",
  type: "page-type/page-type",
  slug: "temper-weapon-enchant",
  definition: "a glyph put on a weapon",
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
        "An enchant's effects state its one-handed legendary worth; grades state each quality.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType

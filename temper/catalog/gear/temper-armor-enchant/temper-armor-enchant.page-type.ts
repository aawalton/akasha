import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperArmorEnchant = {
  id: "01a05fd1-d42e-7a0a-9e97-561c71aeccd4",
  type: "page-type/page-type",
  slug: "temper-armor-enchant",
  definition: "a glyph put on a piece of armor",
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
  createdAt: "2026-09-02T01:53:01.998Z",
  updatedAt: "2026-09-27T04:03:27.000Z",
} as const satisfies PageType

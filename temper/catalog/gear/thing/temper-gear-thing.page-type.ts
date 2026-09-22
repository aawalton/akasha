import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperGearThing = {
  id: "01a05fcc-41ef-7386-84ed-43fb6534121e",
  type: "page-type/page-type",
  slug: "temper-gear-thing",
  definition: "anything a character wears, wields or brews",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/potion-seconds",
    "text-property/buff-id",
    "text-property/debuff-id",
    "text-property/eso-enchant-constant-name",
    "text-property/essence-rune",
    "text-property/glyph-name",
    "text-property/item-level",
    "one-of-property/valid-slots",
  ],
  properties: [
    { pageProperty: "text-property/glyph-name", required: false, many: false },
    { pageProperty: "text-property/essence-rune", required: false, many: false },
    { pageProperty: "text-property/eso-enchant-constant-name", required: false, many: false },
    { pageProperty: "one-of-property/valid-slots", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/item-level", required: false, many: false },
    { pageProperty: "number-property/potion-seconds", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key two gear page types carry is declared here rather than in each page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which buff a drink grants is a field of the shared effect shape rather than a key here.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperArmorType = {
  id: "01a05fd1-d430-77ed-ace6-98856e2a09d7",
  type: "page-type/page-type",
  slug: "temper-armor-type",
  definition: "a kind of armor piece, apart from its weight",
  extends: ["page-type/temper-gear-thing"],
  parts: ["number-property/armor-multiplier"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/armor-multiplier", required: true, many: false },
    { pageProperty: "number-property/enchantment-multiplier", required: true, many: false },
    { pageProperty: "one-of-property/valid-slots", required: true, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece's glyph share is a number rather than a large or small flag.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType

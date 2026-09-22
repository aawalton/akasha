import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const craftyAlfiq = {
  id: "019e66e7-6a52-7487-aab2-b273a946b20e",
  type: "page-type/temper-set",
  slug: "crafty-alfiq",
  title: "Crafty Alfiq",
  key: "crafty-alfiq",
  esoSetId: 440,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

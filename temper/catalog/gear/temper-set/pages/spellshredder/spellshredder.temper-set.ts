import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spellshredder = {
  id: "019e66e7-6a1f-71f8-a2b1-f95dedad7a4d",
  type: "page-type/temper-set",
  slug: "spellshredder",
  title: "Spellshredder",
  key: "spellshredder",
  esoSetId: 830,
  category: "temper-set-category/no-type",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

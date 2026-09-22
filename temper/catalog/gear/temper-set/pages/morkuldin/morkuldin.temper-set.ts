import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const morkuldin = {
  id: "019e668e-9a53-7b7b-94e8-5c8796bac2a5",
  type: "page-type/temper-set",
  slug: "morkuldin",
  title: "Morkuldin",
  key: "morkuldin",
  esoSetId: 219,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const aetherialAscension = {
  id: "019e668e-9a31-7037-b952-5dfe7ab07374",
  type: "page-type/temper-set",
  slug: "aetherial-ascension",
  title: "Aetherial Ascension",
  key: "aetherial-ascension",
  esoSetId: 541,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

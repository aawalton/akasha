import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const assassinsGuile = {
  id: "019e668e-9a37-7871-9ca4-2868c8e96e6f",
  type: "page-type/temper-set",
  slug: "assassins-guile",
  title: "Assassin's Guile",
  key: "assassins-guile",
  esoSetId: 323,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const silverRoseVigil = {
  id: "019e66e6-a0c3-75f4-9ff7-69dbde1c7510",
  type: "page-type/temper-set",
  slug: "silver-rose-vigil",
  title: "Silver Rose Vigil",
  key: "silver-rose-vigil",
  esoSetId: 605,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

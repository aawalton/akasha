import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const warriorPoet = {
  id: "019e66e7-6aac-752c-a6c7-838e1635f1c8",
  type: "page-type/temper-set",
  slug: "warrior-poet",
  title: "Warrior-Poet",
  key: "warrior-poet",
  esoSetId: 322,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

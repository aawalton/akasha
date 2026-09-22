import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const swordDancer = {
  id: "019e66e6-a0cf-73a8-8436-c72615a9f1d9",
  type: "page-type/temper-set",
  slug: "sword-dancer",
  title: "Sword Dancer",
  key: "sword-dancer",
  esoSetId: 310,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

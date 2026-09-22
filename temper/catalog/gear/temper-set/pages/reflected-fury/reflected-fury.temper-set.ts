import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const reflectedFury = {
  id: "019e66e6-a0b5-729b-8e76-87488c2141f9",
  type: "page-type/temper-set",
  slug: "reflected-fury",
  title: "Reflected Fury",
  key: "reflected-fury",
  esoSetId: 737,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

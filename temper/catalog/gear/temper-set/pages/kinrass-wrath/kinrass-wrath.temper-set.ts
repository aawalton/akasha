import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const kinrassWrath = {
  id: "019e66e6-a098-76d2-bca4-c16905e8eee3",
  type: "page-type/temper-set",
  slug: "kinrass-wrath",
  title: "Kinras's Wrath",
  key: "kinrass-wrath",
  esoSetId: 570,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

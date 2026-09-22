import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const stonesAccord = {
  id: "019e66e6-a0c9-7c6d-8936-5c57d3de3f24",
  type: "page-type/temper-set",
  slug: "stones-accord",
  title: "Stone's Accord",
  key: "stones-accord",
  esoSetId: 661,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spelunker = {
  id: "019e66e6-a0c6-7958-9c72-6661d3580fda",
  type: "page-type/temper-set",
  slug: "spelunker",
  title: "Spelunker",
  key: "spelunker",
  esoSetId: 296,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

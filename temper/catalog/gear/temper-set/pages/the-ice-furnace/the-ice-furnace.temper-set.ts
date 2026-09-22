import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const theIceFurnace = {
  id: "019e66e6-a0d3-792c-8798-50e00df7dd30",
  type: "page-type/temper-set",
  slug: "the-ice-furnace",
  title: "The Ice Furnace",
  key: "the-ice-furnace",
  esoSetId: 53,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

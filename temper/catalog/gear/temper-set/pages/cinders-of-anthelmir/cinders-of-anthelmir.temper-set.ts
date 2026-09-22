import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const cindersOfAnthelmir = {
  id: "019e66e6-a068-78d6-b3af-c5fe80633b0d",
  type: "page-type/temper-set",
  slug: "cinders-of-anthelmir",
  title: "Cinders of Anthelmir",
  key: "cinders-of-anthelmir",
  esoSetId: 730,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const dragonsDefilement = {
  id: "019e66e6-a070-7b41-8402-398b175eca17",
  type: "page-type/temper-set",
  slug: "dragons-defilement",
  title: "Dragon's Defilement",
  key: "dragons-defilement",
  esoSetId: 457,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

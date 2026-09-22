import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const crimsonOathsRive = {
  id: "019e66e6-a06a-78f7-bc1e-ce1221d61f9d",
  type: "page-type/temper-set",
  slug: "crimson-oaths-rive",
  title: "Crimson Oath's Rive",
  key: "crimson-oaths-rive",
  esoSetId: 602,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

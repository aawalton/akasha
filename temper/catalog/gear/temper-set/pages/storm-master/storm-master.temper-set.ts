import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const stormMaster = {
  id: "019e66e6-a0cc-7119-bfe8-7322d1e263a8",
  type: "page-type/temper-set",
  slug: "storm-master",
  title: "Storm Master",
  key: "storm-master",
  esoSetId: 188,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

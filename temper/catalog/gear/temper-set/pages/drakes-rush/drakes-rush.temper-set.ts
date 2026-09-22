import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const drakesRush = {
  id: "019e66e6-a071-7be2-b7c8-1722c6516694",
  type: "page-type/temper-set",
  slug: "drakes-rush",
  title: "Drake's Rush",
  key: "drakes-rush",
  esoSetId: 571,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

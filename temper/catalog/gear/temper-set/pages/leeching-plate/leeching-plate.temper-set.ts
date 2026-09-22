import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const leechingPlate = {
  id: "019e66e6-a09d-7d91-a011-3944309adfd6",
  type: "page-type/temper-set",
  slug: "leeching-plate",
  title: "Leeching Plate",
  key: "leeching-plate",
  esoSetId: 196,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

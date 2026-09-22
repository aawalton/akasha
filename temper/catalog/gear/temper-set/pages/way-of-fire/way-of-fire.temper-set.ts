import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wayOfFire = {
  id: "019e66e7-6aae-7d27-89e8-72b189121573",
  type: "page-type/temper-set",
  slug: "way-of-fire",
  title: "Way of Fire",
  key: "way-of-fire",
  esoSetId: 145,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

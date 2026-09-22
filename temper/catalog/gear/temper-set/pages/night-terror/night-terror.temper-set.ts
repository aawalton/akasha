import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nightTerror = {
  id: "019e66e7-6a76-7207-b2dc-e82ce04ac624",
  type: "page-type/temper-set",
  slug: "night-terror",
  title: "Night Terror",
  key: "night-terror",
  esoSetId: 112,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

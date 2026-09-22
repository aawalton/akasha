import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const baanDarsBlessing = {
  id: "019e66ec-7625-7e88-b717-729443ee2bcb",
  type: "page-type/temper-set",
  slug: "baan-dars-blessing",
  title: "Baan Dar's Blessing",
  key: "baan-dars-blessing",
  esoSetId: 756,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

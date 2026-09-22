import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const blessingOfHighIsle = {
  id: "019e66e7-6a48-760e-9604-90de3dd4e258",
  type: "page-type/temper-set",
  slug: "blessing-of-high-isle",
  title: "Blessing of High Isle",
  key: "blessing-of-high-isle",
  esoSetId: 643,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

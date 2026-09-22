import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wrathsun = {
  id: "019e6484-5fea-7b36-9082-557a40dcbdc5",
  type: "page-type/temper-set",
  slug: "wrathsun",
  title: "Wrathsun",
  key: "wrathsun",
  esoSetId: 728,
  category: "temper-set-category/class-set",
  valid: ["*"],
  classId: "temper-class/templar",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

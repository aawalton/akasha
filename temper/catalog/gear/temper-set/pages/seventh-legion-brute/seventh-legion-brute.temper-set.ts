import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const seventhLegionBrute = {
  id: "019e66e7-6a85-7dd7-98c0-e60a58ae6ad5",
  type: "page-type/temper-set",
  slug: "seventh-legion-brute",
  title: "Seventh Legion Brute",
  key: "seventh-legion-brute",
  esoSetId: 70,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

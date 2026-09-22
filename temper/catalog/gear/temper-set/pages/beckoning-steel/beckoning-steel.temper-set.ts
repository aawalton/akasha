import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const beckoningSteel = {
  id: "019e66ec-7657-73d9-9283-c66b85288888",
  type: "page-type/temper-set",
  slug: "beckoning-steel",
  title: "Beckoning Steel",
  key: "beckoning-steel",
  esoSetId: 52,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

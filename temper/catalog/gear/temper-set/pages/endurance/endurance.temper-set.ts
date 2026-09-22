import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const endurance = {
  id: "019e66ec-770e-7e38-87c5-688389338db7",
  type: "page-type/temper-set",
  slug: "endurance",
  title: "Endurance",
  key: "endurance",
  esoSetId: 204,
  category: "temper-set-category/pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

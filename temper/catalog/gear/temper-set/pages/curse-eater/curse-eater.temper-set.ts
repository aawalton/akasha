import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const curseEater = {
  id: "019e66ec-76c4-71fb-b5dd-82b0b0004ad1",
  type: "page-type/temper-set",
  slug: "curse-eater",
  title: "Curse Eater",
  key: "curse-eater",
  esoSetId: 104,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

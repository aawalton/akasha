import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const duroksBane = {
  id: "019e66e6-a079-7af6-b3d6-f7873e4c6244",
  type: "page-type/temper-set",
  slug: "duroks-bane",
  title: "Durok's Bane",
  key: "duroks-bane",
  esoSetId: 71,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

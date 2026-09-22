import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const dreughKingSlayer = {
  id: "019e66e6-a076-7290-9ce7-38d4dcd870cf",
  type: "page-type/temper-set",
  slug: "dreugh-king-slayer",
  title: "Dreugh King Slayer",
  key: "dreugh-king-slayer",
  esoSetId: 61,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

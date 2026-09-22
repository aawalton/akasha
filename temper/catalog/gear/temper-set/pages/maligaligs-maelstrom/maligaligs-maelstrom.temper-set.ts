import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const maligaligsMaelstrom = {
  id: "019e66e6-a0a2-7649-8fd9-ea60940df192",
  type: "page-type/temper-set",
  slug: "maligaligs-maelstrom",
  title: "Maligalig's Maelstrom",
  key: "maligaligs-maelstrom",
  esoSetId: 619,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

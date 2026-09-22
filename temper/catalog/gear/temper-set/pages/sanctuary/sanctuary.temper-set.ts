import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const sanctuary = {
  id: "019e66e6-a0ba-7ca6-80d6-b42b654424df",
  type: "page-type/temper-set",
  slug: "sanctuary",
  title: "Sanctuary",
  key: "sanctuary",
  esoSetId: 110,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

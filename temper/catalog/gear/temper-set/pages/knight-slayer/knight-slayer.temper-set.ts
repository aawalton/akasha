import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const knightSlayer = {
  id: "019e66ec-77c3-7cb6-97c5-f06efd9f1e46",
  type: "page-type/temper-set",
  slug: "knight-slayer",
  title: "Knight Slayer",
  key: "knight-slayer",
  esoSetId: 328,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

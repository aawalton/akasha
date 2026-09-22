import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const knightmare = {
  id: "019e66e6-a09a-7a92-9c53-42cfd1114bf9",
  type: "page-type/temper-set",
  slug: "knightmare",
  title: "Knightmare",
  key: "knightmare",
  esoSetId: 35,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

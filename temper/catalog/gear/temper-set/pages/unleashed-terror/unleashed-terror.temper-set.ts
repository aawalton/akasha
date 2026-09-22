import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const unleashedTerror = {
  id: "019e66e6-a0e4-7dc2-87e9-75881bf9bd6b",
  type: "page-type/temper-set",
  slug: "unleashed-terror",
  title: "Unleashed Terror",
  key: "unleashed-terror",
  esoSetId: 514,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

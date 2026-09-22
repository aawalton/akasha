import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const widowmaker = {
  id: "019e66e6-a0e8-74f8-9784-48b230f1e17f",
  type: "page-type/temper-set",
  slug: "widowmaker",
  title: "Widowmaker",
  key: "widowmaker",
  esoSetId: 262,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

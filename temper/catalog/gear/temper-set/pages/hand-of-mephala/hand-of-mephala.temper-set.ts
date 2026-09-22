import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const handOfMephala = {
  id: "019e66e6-a08a-7943-9f5c-d018b73bac47",
  type: "page-type/temper-set",
  slug: "hand-of-mephala",
  title: "Hand of Mephala",
  key: "hand-of-mephala",
  esoSetId: 263,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

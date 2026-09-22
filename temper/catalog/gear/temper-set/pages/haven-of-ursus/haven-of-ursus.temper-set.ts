import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const havenOfUrsus = {
  id: "019e66e6-a08c-79e8-bc3c-68956a7fa46a",
  type: "page-type/temper-set",
  slug: "haven-of-ursus",
  title: "Haven of Ursus",
  key: "haven-of-ursus",
  esoSetId: 401,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

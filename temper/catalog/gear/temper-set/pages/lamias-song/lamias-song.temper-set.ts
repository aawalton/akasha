import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const lamiasSong = {
  id: "019e66e6-a09c-7c84-86d8-8a7ccd77391a",
  type: "page-type/temper-set",
  slug: "lamias-song",
  title: "Lamia's Song",
  key: "lamias-song",
  esoSetId: 303,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

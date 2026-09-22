import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const caluurionsLegacy = {
  id: "019e66e6-a067-77e3-ac4b-94827454e133",
  type: "page-type/temper-set",
  slug: "caluurions-legacy",
  title: "Caluurion's Legacy",
  key: "caluurions-legacy",
  esoSetId: 343,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

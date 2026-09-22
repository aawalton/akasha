import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const elementalCatalyst = {
  id: "019e66e6-a07b-7d69-ba01-6eea8194b308",
  type: "page-type/temper-set",
  slug: "elemental-catalyst",
  title: "Elemental Catalyst",
  key: "elemental-catalyst",
  esoSetId: 516,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

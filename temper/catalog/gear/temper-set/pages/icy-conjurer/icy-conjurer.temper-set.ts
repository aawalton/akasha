import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const icyConjurer = {
  id: "019e66e6-a092-7187-b595-ee33333c2071",
  type: "page-type/temper-set",
  slug: "icy-conjurer",
  title: "Icy Conjurer",
  key: "icy-conjurer",
  esoSetId: 431,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

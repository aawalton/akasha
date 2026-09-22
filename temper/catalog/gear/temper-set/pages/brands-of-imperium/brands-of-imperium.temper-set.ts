import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const brandsOfImperium = {
  id: "019e66e6-a065-77ce-99a0-39a5608af262",
  type: "page-type/temper-set",
  slug: "brands-of-imperium",
  title: "Brands of Imperium",
  key: "brands-of-imperium",
  esoSetId: 184,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

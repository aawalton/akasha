import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const lightOfCyrodiil = {
  id: "019e66ec-77f6-75e8-8b3d-5781ce3797c7",
  type: "page-type/temper-set",
  slug: "light-of-cyrodiil",
  title: "Light of Cyrodiil",
  key: "light-of-cyrodiil",
  esoSetId: 109,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

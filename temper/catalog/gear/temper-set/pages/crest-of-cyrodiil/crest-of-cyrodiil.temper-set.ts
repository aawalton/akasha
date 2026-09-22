import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const crestOfCyrodiil = {
  id: "019e66ec-76b7-7e0b-ad0c-b4d0fcc691c9",
  type: "page-type/temper-set",
  slug: "crest-of-cyrodiil",
  title: "Crest of Cyrodiil",
  key: "crest-of-cyrodiil",
  esoSetId: 113,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

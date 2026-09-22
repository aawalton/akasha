import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const hewAndSunder = {
  id: "019e66ec-776b-7853-90da-0eae67b58a4e",
  type: "page-type/temper-set",
  slug: "hew-and-sunder",
  title: "Hew and Sunder",
  key: "hew-and-sunder",
  esoSetId: 630,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

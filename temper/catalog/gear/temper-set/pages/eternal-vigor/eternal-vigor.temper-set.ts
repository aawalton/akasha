import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const eternalVigor = {
  id: "019e66e7-6a5b-7a03-b55e-1a45ede47de3",
  type: "page-type/temper-set",
  slug: "eternal-vigor",
  title: "Eternal Vigor",
  key: "eternal-vigor",
  esoSetId: 489,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

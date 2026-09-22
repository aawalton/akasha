import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const vampireLord = {
  id: "019e66e7-6aa4-7ad9-b9b9-987cc1a153f5",
  type: "page-type/temper-set",
  slug: "vampire-lord",
  title: "Vampire Lord",
  key: "vampire-lord",
  esoSetId: 285,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

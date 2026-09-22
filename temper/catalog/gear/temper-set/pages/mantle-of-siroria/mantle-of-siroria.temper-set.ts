import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const mantleOfSiroria = {
  id: "019e66ec-7ba7-7430-895e-b6d2d079d34d",
  type: "page-type/temper-set",
  slug: "mantle-of-siroria",
  title: "Mantle of Siroria",
  key: "mantle-of-siroria",
  esoSetId: 390,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

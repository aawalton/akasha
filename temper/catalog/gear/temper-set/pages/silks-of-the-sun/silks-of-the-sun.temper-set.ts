import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const silksOfTheSun = {
  id: "019e66e7-6a8a-7ab7-bbc0-409d33b90761",
  type: "page-type/temper-set",
  slug: "silks-of-the-sun",
  title: "Silks of the Sun",
  key: "silks-of-the-sun",
  esoSetId: 31,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

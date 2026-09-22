import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const blackFoundrySteel = {
  id: "019e66e7-69fc-7757-b1d1-f34d785c6d8b",
  type: "page-type/temper-set",
  slug: "black-foundry-steel",
  title: "Black Foundry Steel",
  key: "black-foundry-steel",
  esoSetId: 824,
  category: "temper-set-category/no-type",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

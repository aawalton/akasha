import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const alessianOrder = {
  id: "019e66ec-760c-7981-984b-06b35e689d05",
  type: "page-type/temper-set",
  slug: "alessian-order",
  title: "Alessian Order",
  key: "alessian-order",
  esoSetId: 39,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

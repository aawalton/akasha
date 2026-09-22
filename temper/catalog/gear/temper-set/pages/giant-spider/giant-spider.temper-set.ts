import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const giantSpider = {
  id: "019e6484-604a-7aee-84d6-770c3afbe211",
  type: "page-type/temper-set",
  slug: "giant-spider",
  title: "Giant Spider",
  key: "giant-spider",
  esoSetId: 264,
  category: "temper-set-category/other",
  valid: ["head:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

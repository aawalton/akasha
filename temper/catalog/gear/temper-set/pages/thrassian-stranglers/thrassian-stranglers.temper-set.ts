import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const thrassianStranglers = {
  id: "019e6484-6040-74ee-909a-85daf743d6b4",
  type: "page-type/temper-set",
  slug: "thrassian-stranglers",
  title: "Thrassian Stranglers",
  key: "thrassian-stranglers",
  esoSetId: 501,
  category: "temper-set-category/mythic",
  valid: ["hands:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

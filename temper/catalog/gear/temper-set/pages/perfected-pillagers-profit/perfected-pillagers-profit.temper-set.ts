import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedPillagersProfit = {
  id: "019e66ec-7d0e-790f-9002-0e356cb6946b",
  type: "page-type/temper-set",
  slug: "perfected-pillagers-profit",
  title: "Perfected Pillager's Profit",
  key: "perfected-pillagers-profit",
  esoSetId: 650,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

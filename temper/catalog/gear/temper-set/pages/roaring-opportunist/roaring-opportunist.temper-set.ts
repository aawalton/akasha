import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const roaringOpportunist = {
  id: "019e66ec-7e38-7ff9-aea7-27b17c6ffc59",
  type: "page-type/temper-set",
  slug: "roaring-opportunist",
  title: "Roaring Opportunist",
  key: "roaring-opportunist",
  esoSetId: 496,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

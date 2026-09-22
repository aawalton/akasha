import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const dragonsAppetite = {
  id: "019e668e-9a41-7f65-8c6f-0acb3312fd2d",
  type: "page-type/temper-set",
  slug: "dragons-appetite",
  title: "Dragon's Appetite",
  key: "dragons-appetite",
  esoSetId: 491,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

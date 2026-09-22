import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const oldGrowthBrewer = {
  id: "019e668e-9a5a-7a4c-837c-f89a8bc4c4e9",
  type: "page-type/temper-set",
  slug: "old-growth-brewer",
  title: "Old Growth Brewer",
  key: "old-growth-brewer",
  esoSetId: 678,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

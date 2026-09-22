import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const sharedPain = {
  id: "019e66ec-78e4-7862-ba58-c21ff718831f",
  type: "page-type/temper-set",
  slug: "shared-pain",
  title: "Shared Pain",
  key: "shared-pain",
  esoSetId: 783,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const kynmarchersCruelty = {
  id: "019e66e7-6a6a-7109-b47a-413c1f8aade8",
  type: "page-type/temper-set",
  slug: "kynmarchers-cruelty",
  title: "Kynmarcher's Cruelty",
  key: "kynmarchers-cruelty",
  esoSetId: 615,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

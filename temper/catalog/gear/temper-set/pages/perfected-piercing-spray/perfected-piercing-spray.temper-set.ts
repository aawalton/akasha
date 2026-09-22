import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedPiercingSpray = {
  id: "019e66ec-7d00-74a8-8fd3-7cdf38792ba0",
  type: "page-type/temper-set",
  slug: "perfected-piercing-spray",
  title: "Perfected Piercing Spray",
  key: "perfected-piercing-spray",
  esoSetId: 360,
  category: "temper-set-category/trial",
  valid: ["bow"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const steadfastHero = {
  id: "019e66ec-7954-7143-9f5a-5f10b572d4e3",
  type: "page-type/temper-set",
  slug: "steadfast-hero",
  title: "Steadfast Hero",
  key: "steadfast-hero",
  esoSetId: 421,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const lucillasWindshield = {
  id: "019e66e7-6a0f-7595-ac77-99a0b0210393",
  type: "page-type/temper-set",
  slug: "lucillas-windshield",
  title: "Lucilla's Windshield",
  key: "lucillas-windshield",
  esoSetId: 796,
  category: "temper-set-category/no-type",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

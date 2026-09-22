import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const stendarrsEmbrace = {
  id: "019e66e7-6a92-7ff0-a3e5-71fd3ad9d72d",
  type: "page-type/temper-set",
  slug: "stendarrs-embrace",
  title: "Stendarr's Embrace",
  key: "stendarrs-embrace",
  esoSetId: 56,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

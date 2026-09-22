import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nightMothersEmbrace = {
  id: "019e66e7-6a74-7e22-88a6-ade5c30eaf2c",
  type: "page-type/temper-set",
  slug: "night-mothers-embrace",
  title: "Night Mother's Embrace",
  key: "night-mothers-embrace",
  esoSetId: 34,
  category: "temper-set-category/overland",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

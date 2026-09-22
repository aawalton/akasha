import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const flankingStrategist = {
  id: "019e66e7-6a5f-7349-b9de-1a97ba7d90de",
  type: "page-type/temper-set",
  slug: "flanking-strategist",
  title: "Flanking Strategist",
  key: "flanking-strategist",
  esoSetId: 244,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const warMaiden = {
  id: "019e66e7-6aab-70cc-8df9-2fe7b441df91",
  type: "page-type/temper-set",
  slug: "war-maiden",
  title: "War Maiden",
  key: "war-maiden",
  esoSetId: 320,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

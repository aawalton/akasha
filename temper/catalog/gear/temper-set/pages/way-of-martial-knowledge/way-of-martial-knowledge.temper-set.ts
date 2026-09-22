import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wayOfMartialKnowledge = {
  id: "019e66e7-6ab0-716b-854f-31799b8d75be",
  type: "page-type/temper-set",
  slug: "way-of-martial-knowledge",
  title: "Way of Martial Knowledge",
  key: "way-of-martial-knowledge",
  esoSetId: 147,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

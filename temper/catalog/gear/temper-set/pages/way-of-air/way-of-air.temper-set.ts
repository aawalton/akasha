import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wayOfAir = {
  id: "019e66e7-6aad-78bb-9970-dd7bb86bab14",
  type: "page-type/temper-set",
  slug: "way-of-air",
  title: "Way of Air",
  key: "way-of-air",
  esoSetId: 146,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

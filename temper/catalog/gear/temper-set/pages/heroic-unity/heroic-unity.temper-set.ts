import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const heroicUnity = {
  id: "019e66e7-6a09-747c-b442-e3b95f46428c",
  type: "page-type/temper-set",
  slug: "heroic-unity",
  title: "Heroic Unity",
  key: "heroic-unity",
  esoSetId: 798,
  subcategoryId: "no-type",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

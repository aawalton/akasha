import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const overwhelmingSurge = {
  id: "019e66e6-a0ab-7fe7-b9de-75d864c85ebc",
  type: "page-type/temper-set",
  slug: "overwhelming-surge",
  title: "Overwhelming Surge",
  key: "overwhelming-surge",
  esoSetId: 193,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

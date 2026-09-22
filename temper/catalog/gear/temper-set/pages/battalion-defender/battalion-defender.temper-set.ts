import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const battalionDefender = {
  id: "019e66ec-763e-7eab-a642-42220d59688a",
  type: "page-type/temper-set",
  slug: "battalion-defender",
  title: "Battalion Defender",
  key: "battalion-defender",
  esoSetId: 422,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

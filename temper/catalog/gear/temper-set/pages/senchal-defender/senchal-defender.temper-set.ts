import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const senchalDefender = {
  id: "019e66e7-6a83-76a4-b36a-c71c254c02e7",
  type: "page-type/temper-set",
  slug: "senchal-defender",
  title: "Senchal Defender",
  key: "senchal-defender",
  esoSetId: 465,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

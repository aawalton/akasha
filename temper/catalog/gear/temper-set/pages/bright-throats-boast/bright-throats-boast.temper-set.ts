import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const brightThroatsBoast = {
  id: "019e66e7-6a4d-7814-804c-b44ae5c3e90a",
  type: "page-type/temper-set",
  slug: "bright-throats-boast",
  title: "Bright-Throat's Boast",
  key: "bright-throats-boast",
  esoSetId: 405,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

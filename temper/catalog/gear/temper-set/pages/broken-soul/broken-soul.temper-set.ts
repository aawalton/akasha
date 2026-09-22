import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const brokenSoul = {
  id: "019e6484-6049-79e4-87e4-0e12f29fd151",
  type: "page-type/temper-set",
  slug: "broken-soul",
  title: "Broken Soul",
  key: "broken-soul",
  esoSetId: 381,
  category: "temper-set-category/other",
  valid: ["ring"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const slimecraw = {
  id: "019e6484-6017-776b-90d1-aba01af078e1",
  type: "page-type/temper-set",
  slug: "slimecraw",
  title: "Slimecraw",
  key: "slimecraw",
  esoSetId: 270,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

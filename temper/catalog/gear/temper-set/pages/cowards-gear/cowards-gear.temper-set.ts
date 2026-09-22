import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const cowardsGear = {
  id: "019e66ec-76ab-7b33-8718-cfd6761a17c1",
  type: "page-type/temper-set",
  slug: "cowards-gear",
  title: "Coward's Gear",
  key: "cowards-gear",
  esoSetId: 327,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

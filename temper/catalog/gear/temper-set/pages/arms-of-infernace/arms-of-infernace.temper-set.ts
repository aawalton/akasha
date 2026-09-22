import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const armsOfInfernace = {
  id: "019e6484-6047-70b1-8d44-a5f8258a45a5",
  type: "page-type/temper-set",
  slug: "arms-of-infernace",
  title: "Arms of Infernace",
  key: "arms-of-infernace",
  esoSetId: 120,
  category: "temper-set-category/other",
  valid: ["sword", "necklace"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

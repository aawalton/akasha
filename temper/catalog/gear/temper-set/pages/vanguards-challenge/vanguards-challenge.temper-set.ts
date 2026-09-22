import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const vanguardsChallenge = {
  id: "019e66ec-79a6-74c2-bf18-d4b4227f5436",
  type: "page-type/temper-set",
  slug: "vanguards-challenge",
  title: "Vanguard's Challenge",
  key: "vanguards-challenge",
  esoSetId: 326,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

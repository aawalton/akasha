import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const dragonguardElite = {
  id: "019e66e7-6a58-71dd-8670-059f84a70e25",
  type: "page-type/temper-set",
  slug: "dragonguard-elite",
  title: "Dragonguard Elite",
  key: "dragonguard-elite",
  esoSetId: 467,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

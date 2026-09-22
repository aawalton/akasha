import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const siegemastersFocus = {
  id: "019e66ec-791d-729e-ac11-d892f1e96511",
  type: "page-type/temper-set",
  slug: "siegemasters-focus",
  title: "Siegemaster's Focus",
  key: "siegemasters-focus",
  esoSetId: 784,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

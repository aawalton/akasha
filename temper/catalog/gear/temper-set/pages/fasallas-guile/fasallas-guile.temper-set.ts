import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const fasallasGuile = {
  id: "019e66ec-7736-7152-8949-ec9236ca243b",
  type: "page-type/temper-set",
  slug: "fasallas-guile",
  title: "Fasalla's Guile",
  key: "fasallas-guile",
  esoSetId: 238,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

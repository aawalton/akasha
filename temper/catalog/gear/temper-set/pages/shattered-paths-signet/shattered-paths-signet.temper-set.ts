import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const shatteredPathsSignet = {
  id: "01a0d94a-4cf7-7846-81a0-d6ccf0100783",
  type: "page-type/temper-set",
  slug: "shattered-paths-signet",
  title: "Shattered Paths Signet",
  key: "shattered-paths-signet",
  esoSetId: 848,
  category: "temper-set-category/mythic",
  valid: ["ring"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

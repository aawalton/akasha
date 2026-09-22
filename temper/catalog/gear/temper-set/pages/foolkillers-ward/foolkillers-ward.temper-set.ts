import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const foolkillersWard = {
  id: "019e66e6-a080-7671-8dc6-fc6ab289847a",
  type: "page-type/temper-set",
  slug: "foolkillers-ward",
  title: "Foolkiller's Ward",
  key: "foolkillers-ward",
  esoSetId: 574,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

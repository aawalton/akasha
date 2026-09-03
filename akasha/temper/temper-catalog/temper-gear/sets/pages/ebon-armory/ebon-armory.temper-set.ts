import type { TemperSet } from "../../temper-set.page-type.ts"

export const ebonArmory = {
  id: "019e66e6-a07a-7c67-a6ba-cc925d7d3b03",
  pageTypeSlug: "temper-set",
  slug: "ebon-armory",
  title: "Ebon Armory",
  key: "ebon-armory",
  esoSetId: 122,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

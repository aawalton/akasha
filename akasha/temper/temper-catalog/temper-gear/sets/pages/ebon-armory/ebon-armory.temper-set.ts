import type { TemperSet } from "../../temper-set.page-type.ts"

export const ebonArmory = {
  id: "01a05fda-f7cd-7a34-ac33-2ebd3f1bb5a3",
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

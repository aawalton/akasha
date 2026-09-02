import type { TemperSet } from "../../temper-set.page-type.ts"

export const knightmare = {
  id: "01a05fda-f7f6-7dfc-b26e-a706fac888ed",
  pageTypeSlug: "temper-set",
  slug: "knightmare",
  title: "Knightmare",
  key: "knightmare",
  esoSetId: 35,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

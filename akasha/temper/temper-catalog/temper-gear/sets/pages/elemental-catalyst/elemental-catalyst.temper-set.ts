import type { TemperSet } from "../../temper-set.page-type.ts"

export const elementalCatalyst = {
  id: "01a05fda-f7ce-7e90-b22a-10c243c3cd14",
  pageTypeSlug: "temper-set",
  slug: "elemental-catalyst",
  title: "Elemental Catalyst",
  key: "elemental-catalyst",
  esoSetId: 516,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

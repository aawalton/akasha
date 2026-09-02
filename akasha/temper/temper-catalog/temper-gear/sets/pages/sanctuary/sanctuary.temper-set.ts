import type { TemperSet } from "../../temper-set.page-type.ts"

export const sanctuary = {
  id: "01a05fdc-972a-7ca9-aa5d-d6d1814ec96f",
  pageTypeSlug: "temper-set",
  slug: "sanctuary",
  title: "Sanctuary",
  key: "sanctuary",
  esoSetId: 110,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "../../temper-set.page-type.ts"

export const ulfnorsFavor = {
  id: "01a05fde-b3b9-7591-8731-5f3eda55a992",
  pageTypeSlug: "temper-set",
  slug: "ulfnors-favor",
  title: "Ulfnor's Favor",
  key: "ulfnors-favor",
  esoSetId: 345,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

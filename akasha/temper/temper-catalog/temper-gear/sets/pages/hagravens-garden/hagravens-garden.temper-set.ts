import type { TemperSet } from "../../temper-set.page-type.ts"

export const hagravensGarden = {
  id: "01a05fda-f7e3-72f7-86da-ec234e93f8b1",
  pageTypeSlug: "temper-set",
  slug: "hagravens-garden",
  title: "Hagraven's Garden",
  key: "hagravens-garden",
  esoSetId: 340,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

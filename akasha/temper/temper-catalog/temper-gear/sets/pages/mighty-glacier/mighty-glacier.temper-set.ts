import type { TemperSet } from "../../temper-set.page-type.ts"

export const mightyGlacier = {
  id: "01a05fdb-7d40-77ad-9a92-54708d43a3b4",
  pageTypeSlug: "temper-set",
  slug: "mighty-glacier",
  title: "Mighty Glacier",
  key: "mighty-glacier",
  esoSetId: 429,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

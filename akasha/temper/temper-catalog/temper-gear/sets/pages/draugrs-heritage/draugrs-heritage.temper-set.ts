import type { TemperSet } from "../../temper-set.page-type.ts"

export const draugrsHeritage = {
  id: "01a05fda-f7c9-7777-985c-a492d35a1b60",
  pageTypeSlug: "temper-set",
  slug: "draugrs-heritage",
  title: "Draugr's Heritage",
  key: "draugrs-heritage",
  esoSetId: 135,
  subcategoryId: "overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

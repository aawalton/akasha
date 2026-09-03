import type { TemperSet } from "../../temper-set.page-type.ts"

export const draugrsHeritage = {
  id: "019e66e7-6a59-7486-8d2a-ceb78960580c",
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

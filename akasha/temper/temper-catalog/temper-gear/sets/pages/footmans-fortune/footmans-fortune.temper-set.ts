import type { TemperSet } from "../../temper-set.page-type.ts"

export const footmansFortune = {
  id: "01a05fda-f7d9-7c7a-8b03-c04dfdf43744",
  pageTypeSlug: "temper-set",
  slug: "footmans-fortune",
  title: "Footman's Fortune",
  key: "footmans-fortune",
  esoSetId: 24,
  subcategoryId: "arena",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "../../temper-set.page-type.ts"

export const theJuggernaut = {
  id: "01a05fde-b3a9-7b2b-8abd-f458346c2fd9",
  pageTypeSlug: "temper-set",
  slug: "the-juggernaut",
  title: "The Juggernaut",
  key: "the-juggernaut",
  esoSetId: 63,
  subcategoryId: "pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

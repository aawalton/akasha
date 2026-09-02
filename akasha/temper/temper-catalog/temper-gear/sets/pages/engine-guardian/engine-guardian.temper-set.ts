import type { TemperSet } from "../../temper-set.page-type.ts"

export const engineGuardian = {
  id: "01a05fda-f7d0-7b0b-b38a-e01bf7eed14e",
  pageTypeSlug: "temper-set",
  slug: "engine-guardian",
  title: "Engine Guardian",
  key: "engine-guardian",
  esoSetId: 166,
  subcategoryId: "monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

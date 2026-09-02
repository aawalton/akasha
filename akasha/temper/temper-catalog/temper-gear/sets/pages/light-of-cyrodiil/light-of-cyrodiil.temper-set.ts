import type { TemperSet } from "../../temper-set.page-type.ts"

export const lightOfCyrodiil = {
  id: "01a05fdb-7d33-777b-b804-6c09457f1d26",
  pageTypeSlug: "temper-set",
  slug: "light-of-cyrodiil",
  title: "Light of Cyrodiil",
  key: "light-of-cyrodiil",
  esoSetId: 109,
  subcategoryId: "pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

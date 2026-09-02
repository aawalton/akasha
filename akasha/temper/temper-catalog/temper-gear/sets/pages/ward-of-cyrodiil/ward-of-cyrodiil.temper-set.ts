import type { TemperSet } from "../../temper-set.page-type.ts"

export const wardOfCyrodiil = {
  id: "01a05fde-b3c6-7dce-8899-7bc230b2436d",
  pageTypeSlug: "temper-set",
  slug: "ward-of-cyrodiil",
  title: "Ward of Cyrodiil",
  key: "ward-of-cyrodiil",
  esoSetId: 111,
  subcategoryId: "pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

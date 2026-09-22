import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const maarselok = {
  id: "019e6484-6004-7cc8-86a2-48695c6517fa",
  type: "page-type/temper-set",
  slug: "maarselok",
  title: "Maarselok",
  key: "maarselok",
  esoSetId: 459,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

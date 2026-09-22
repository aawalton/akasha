import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const grundwulf = {
  id: "019e6484-5ffa-7037-9692-7990e6f76f0d",
  type: "page-type/temper-set",
  slug: "grundwulf",
  title: "Grundwulf",
  key: "grundwulf",
  esoSetId: 458,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

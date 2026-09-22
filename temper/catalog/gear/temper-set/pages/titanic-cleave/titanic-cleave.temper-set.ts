import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const titanicCleave = {
  id: "019e6484-5fd7-720c-8a7d-46ed80ddc6ca",
  type: "page-type/temper-set",
  slug: "titanic-cleave",
  title: "Titanic Cleave",
  key: "titanic-cleave",
  esoSetId: 313,
  category: "temper-set-category/arena",
  valid: ["greatsword", "battleaxe", "maul"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

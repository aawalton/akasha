import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const frenziedMomentum = {
  id: "019e6484-5faf-763b-9a49-86cb0efee1cd",
  type: "page-type/temper-set",
  slug: "frenzied-momentum",
  title: "Frenzied Momentum",
  key: "frenzied-momentum",
  esoSetId: 559,
  category: "temper-set-category/arena",
  valid: ["greatsword", "battleaxe", "maul"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

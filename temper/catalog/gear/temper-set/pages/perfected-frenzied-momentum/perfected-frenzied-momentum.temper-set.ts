import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedFrenziedMomentum = {
  id: "019e6484-5fbe-7079-a258-8fa44d738993",
  type: "page-type/temper-set",
  slug: "perfected-frenzied-momentum",
  title: "Perfected Frenzied Momentum",
  key: "perfected-frenzied-momentum",
  esoSetId: 565,
  category: "temper-set-category/arena",
  valid: ["greatsword", "battleaxe", "maul"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

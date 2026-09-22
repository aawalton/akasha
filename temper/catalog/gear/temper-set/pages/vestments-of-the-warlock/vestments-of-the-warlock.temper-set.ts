import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const vestmentsOfTheWarlock = {
  id: "019e66e6-a0e5-7f25-8d75-12e9a47b99eb",
  type: "page-type/temper-set",
  slug: "vestments-of-the-warlock",
  title: "Vestments of the Warlock",
  key: "vestments-of-the-warlock",
  esoSetId: 19,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

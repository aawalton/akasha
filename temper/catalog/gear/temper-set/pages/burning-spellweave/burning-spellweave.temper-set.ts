import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const burningSpellweave = {
  id: "019e66e6-a066-7813-b855-a2bdd3ccb862",
  type: "page-type/temper-set",
  slug: "burning-spellweave",
  title: "Burning Spellweave",
  key: "burning-spellweave",
  esoSetId: 160,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

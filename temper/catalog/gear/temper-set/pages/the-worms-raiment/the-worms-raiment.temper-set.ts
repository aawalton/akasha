import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const theWormsRaiment = {
  id: "019e66e6-a0d4-7a5a-adfe-c995ce7145e1",
  type: "page-type/temper-set",
  slug: "the-worms-raiment",
  title: "The Worm's Raiment",
  key: "the-worms-raiment",
  esoSetId: 124,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

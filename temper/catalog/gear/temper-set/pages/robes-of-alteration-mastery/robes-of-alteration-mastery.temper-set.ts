import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const robesOfAlterationMastery = {
  id: "019e66ec-78ad-70c0-a5a8-92ed7a6e8b5b",
  type: "page-type/temper-set",
  slug: "robes-of-alteration-mastery",
  title: "Robes of Alteration Mastery",
  key: "robes-of-alteration-mastery",
  esoSetId: 76,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

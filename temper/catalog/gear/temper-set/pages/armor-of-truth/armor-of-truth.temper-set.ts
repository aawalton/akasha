import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const armorOfTruth = {
  id: "019e66e6-a05a-7377-8110-0449e2c7c6d6",
  type: "page-type/temper-set",
  slug: "armor-of-truth",
  title: "Armor of Truth",
  key: "armor-of-truth",
  esoSetId: 96,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

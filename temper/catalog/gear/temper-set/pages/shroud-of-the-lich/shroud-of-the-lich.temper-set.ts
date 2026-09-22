import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const shroudOfTheLich = {
  id: "019e66e6-a0c2-7579-8327-b7e4f131c8b8",
  type: "page-type/temper-set",
  slug: "shroud-of-the-lich",
  title: "Shroud of the Lich",
  key: "shroud-of-the-lich",
  esoSetId: 134,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

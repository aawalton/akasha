import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const magickaFurnace = {
  id: "019e66e6-a0a1-70bc-9884-1bdf3e1ab117",
  type: "page-type/temper-set",
  slug: "magicka-furnace",
  title: "Magicka Furnace",
  key: "magicka-furnace",
  esoSetId: 103,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

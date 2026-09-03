import type { TemperSet } from "../../temper-set.page-type.ts"

export const magickaFurnace = {
  id: "019e66e6-a0a1-70bc-9884-1bdf3e1ab117",
  pageTypeSlug: "temper-set",
  slug: "magicka-furnace",
  title: "Magicka Furnace",
  key: "magicka-furnace",
  esoSetId: 103,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

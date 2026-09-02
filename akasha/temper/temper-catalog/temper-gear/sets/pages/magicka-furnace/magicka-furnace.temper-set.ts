import type { TemperSet } from "../../temper-set.page-type.ts"

export const magickaFurnace = {
  id: "01a05fdb-7d38-701f-b5c1-5766adb90483",
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

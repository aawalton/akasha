import type { TemperSet } from "../../temper-set.page-type.ts"

export const joltingArms = {
  id: "01a05fda-f7f3-7b69-ba7a-e4ea49896454",
  pageTypeSlug: "temper-set",
  slug: "jolting-arms",
  title: "Jolting Arms",
  key: "jolting-arms",
  esoSetId: 186,
  subcategoryId: "dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

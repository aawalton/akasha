import type { TemperSet } from "../../temper-set.page-type.ts"

export const treasureHunter = {
  id: "01a05fde-b3b4-77ed-96fd-3442c4961c50",
  pageTypeSlug: "temper-set",
  slug: "treasure-hunter",
  title: "Treasure Hunter",
  key: "treasure-hunter",
  esoSetId: 305,
  subcategoryId: "dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

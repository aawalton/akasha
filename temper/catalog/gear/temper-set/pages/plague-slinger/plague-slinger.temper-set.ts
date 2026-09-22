import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const plagueSlinger = {
  id: "019e66e6-a0b0-742d-9af9-a2ac3843ee7d",
  type: "page-type/temper-set",
  slug: "plague-slinger",
  title: "Plague Slinger",
  key: "plague-slinger",
  esoSetId: 347,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const undauntedBastion = {
  id: "019e66e6-a0e0-7874-bd02-a8b1d11a439b",
  type: "page-type/temper-set",
  slug: "undaunted-bastion",
  title: "Undaunted Bastion",
  key: "undaunted-bastion",
  esoSetId: 155,
  category: "temper-set-category/dungeon",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

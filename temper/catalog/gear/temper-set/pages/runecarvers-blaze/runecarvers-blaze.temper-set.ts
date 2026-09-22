import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const runecarversBlaze = {
  id: "019e66e6-a0b8-77f8-a61d-80b6827d6adb",
  type: "page-type/temper-set",
  slug: "runecarvers-blaze",
  title: "Runecarver's Blaze",
  key: "runecarvers-blaze",
  esoSetId: 684,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

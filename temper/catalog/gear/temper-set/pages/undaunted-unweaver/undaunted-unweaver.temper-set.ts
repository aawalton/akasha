import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const undauntedUnweaver = {
  id: "019e66e6-a0e2-7aec-aeef-13a7beaae689",
  type: "page-type/temper-set",
  slug: "undaunted-unweaver",
  title: "Undaunted Unweaver",
  key: "undaunted-unweaver",
  esoSetId: 157,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

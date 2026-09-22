import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const undauntedInfiltrator = {
  id: "019e66e6-a0e1-7ab2-a4f7-5e8a53903251",
  type: "page-type/temper-set",
  slug: "undaunted-infiltrator",
  title: "Undaunted Infiltrator",
  key: "undaunted-infiltrator",
  esoSetId: 156,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

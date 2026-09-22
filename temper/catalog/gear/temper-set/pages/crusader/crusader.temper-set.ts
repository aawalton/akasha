import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const crusader = {
  id: "019e66e6-a06c-7a13-8176-8c3a94c01bcc",
  type: "page-type/temper-set",
  slug: "crusader",
  title: "Crusader",
  key: "crusader",
  esoSetId: 77,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

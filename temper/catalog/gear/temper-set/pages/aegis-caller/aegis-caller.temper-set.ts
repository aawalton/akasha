import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const aegisCaller = {
  id: "019e66e6-a054-7c62-8e6c-63f7d706f86a",
  type: "page-type/temper-set",
  slug: "aegis-caller",
  title: "Aegis Caller",
  key: "aegis-caller",
  esoSetId: 475,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

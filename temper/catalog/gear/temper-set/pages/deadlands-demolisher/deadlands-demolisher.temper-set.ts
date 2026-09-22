import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const deadlandsDemolisher = {
  id: "019e668e-9a3f-75fa-a650-15098d99e7a2",
  type: "page-type/temper-set",
  slug: "deadlands-demolisher",
  title: "Deadlands Demolisher",
  key: "deadlands-demolisher",
  esoSetId: 611,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

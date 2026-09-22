import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const balorgh = {
  id: "019e6484-5fed-7af8-b50c-5b22a0e924e8",
  type: "page-type/temper-set",
  slug: "balorgh",
  title: "Balorgh",
  key: "balorgh",
  esoSetId: 397,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

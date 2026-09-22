import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const velidreth = {
  id: "019e6484-6022-7d0b-a062-73b5e900418f",
  type: "page-type/temper-set",
  slug: "velidreth",
  title: "Velidreth",
  key: "velidreth",
  esoSetId: 257,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

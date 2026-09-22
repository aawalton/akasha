import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const causticArrow = {
  id: "019e6484-5fa0-7643-93fd-b0ed3447e9a1",
  type: "page-type/temper-set",
  slug: "caustic-arrow",
  title: "Caustic Arrow",
  key: "caustic-arrow",
  esoSetId: 316,
  category: "temper-set-category/arena",
  valid: ["bow"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ringOfThePaleOrder = {
  id: "019e6484-6034-77d9-99cf-58562ae24bf3",
  type: "page-type/temper-set",
  slug: "ring-of-the-pale-order",
  title: "Ring of the Pale Order",
  key: "ring-of-the-pale-order",
  esoSetId: 575,
  category: "temper-set-category/mythic",
  valid: ["ring"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

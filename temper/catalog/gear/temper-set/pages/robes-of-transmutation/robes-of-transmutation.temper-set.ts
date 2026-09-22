import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const robesOfTransmutation = {
  id: "019e66ec-78bb-7cbb-9cc7-4aa72f509697",
  type: "page-type/temper-set",
  slug: "robes-of-transmutation",
  title: "Robes of Transmutation",
  key: "robes-of-transmutation",
  esoSetId: 235,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

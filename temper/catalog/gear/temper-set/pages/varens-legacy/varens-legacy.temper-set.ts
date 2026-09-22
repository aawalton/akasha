import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const varensLegacy = {
  id: "019e668e-9a72-7b18-b371-4adc22e15d16",
  type: "page-type/temper-set",
  slug: "varens-legacy",
  title: "Varen's Legacy",
  key: "varens-legacy",
  esoSetId: 241,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

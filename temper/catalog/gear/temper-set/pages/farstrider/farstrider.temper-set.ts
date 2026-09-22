import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const farstrider = {
  id: "019e66ec-7728-7caf-a9ef-aea97d47de61",
  type: "page-type/temper-set",
  slug: "farstrider",
  title: "Farstrider",
  key: "farstrider",
  esoSetId: 792,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

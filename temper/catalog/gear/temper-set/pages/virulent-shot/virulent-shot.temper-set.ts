import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const virulentShot = {
  id: "019e6484-5fd8-713a-b04d-e7cc328739d6",
  type: "page-type/temper-set",
  slug: "virulent-shot",
  title: "Virulent Shot",
  key: "virulent-shot",
  esoSetId: 414,
  category: "temper-set-category/arena",
  valid: ["bow"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const oblivionsFoe = {
  id: "019e668e-9a59-7c3b-9de4-1501b1537d8e",
  type: "page-type/temper-set",
  slug: "oblivions-foe",
  title: "Oblivion's Foe",
  key: "oblivions-foe",
  esoSetId: 73,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const witchmanArmor = {
  id: "019e66e7-6ab6-79a6-a18e-105ab54f1315",
  type: "page-type/temper-set",
  slug: "witchman-armor",
  title: "Witchman Armor",
  key: "witchman-armor",
  esoSetId: 20,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

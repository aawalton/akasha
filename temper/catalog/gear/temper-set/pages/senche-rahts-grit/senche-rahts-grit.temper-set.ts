import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const sencheRahtsGrit = {
  id: "019e668e-9a60-7a45-8ce8-afc95467f855",
  type: "page-type/temper-set",
  slug: "senche-rahts-grit",
  title: "Senche-raht's Grit",
  key: "senche-rahts-grit",
  esoSetId: 438,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

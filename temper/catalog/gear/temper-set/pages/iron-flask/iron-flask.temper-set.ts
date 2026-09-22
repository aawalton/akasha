import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ironFlask = {
  id: "019e668e-9a4c-75a3-8756-94ae97036a6e",
  type: "page-type/temper-set",
  slug: "iron-flask",
  title: "Iron Flask",
  key: "iron-flask",
  esoSetId: 612,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

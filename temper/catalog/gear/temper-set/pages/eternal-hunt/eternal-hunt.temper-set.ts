import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const eternalHunt = {
  id: "019e668e-9a43-7bd1-9c25-4d6d8af19967",
  type: "page-type/temper-set",
  slug: "eternal-hunt",
  title: "Eternal Hunt",
  key: "eternal-hunt",
  esoSetId: 226,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

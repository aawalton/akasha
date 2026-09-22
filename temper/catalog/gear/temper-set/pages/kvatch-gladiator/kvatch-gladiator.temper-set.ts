import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const kvatchGladiator = {
  id: "019e668e-9a4e-7119-8fc2-9b22c4a9f1b3",
  type: "page-type/temper-set",
  slug: "kvatch-gladiator",
  title: "Kvatch Gladiator",
  key: "kvatch-gladiator",
  esoSetId: 240,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

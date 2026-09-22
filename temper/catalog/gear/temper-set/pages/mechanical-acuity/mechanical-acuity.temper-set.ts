import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const mechanicalAcuity = {
  id: "019e668e-9a51-7f7f-8083-be71b7d00a70",
  type: "page-type/temper-set",
  slug: "mechanical-acuity",
  title: "Mechanical Acuity",
  key: "mechanical-acuity",
  esoSetId: 353,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

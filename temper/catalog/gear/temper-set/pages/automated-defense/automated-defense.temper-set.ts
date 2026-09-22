import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const automatedDefense = {
  id: "019e66ec-7a52-7bb7-9d34-d2b8de74a8ad",
  type: "page-type/temper-set",
  slug: "automated-defense",
  title: "Automated Defense",
  key: "automated-defense",
  esoSetId: 330,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

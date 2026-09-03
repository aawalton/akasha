import type { TemperSet } from "../../temper-set.page-type.ts"

export const automatedDefense = {
  id: "019e66ec-7a52-7bb7-9d34-d2b8de74a8ad",
  pageTypeSlug: "temper-set",
  slug: "automated-defense",
  title: "Automated Defense",
  key: "automated-defense",
  esoSetId: 330,
  subcategoryId: "trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

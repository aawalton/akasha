import type { TemperSet } from "../../temper-set.page-type.ts"

export const automatedDefense = {
  id: "01a05fda-02e9-79f5-be5c-5d22ffbd91ab",
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

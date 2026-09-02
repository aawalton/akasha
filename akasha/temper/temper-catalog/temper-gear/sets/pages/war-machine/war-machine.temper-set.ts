import type { TemperSet } from "../../temper-set.page-type.ts"

export const warMachine = {
  id: "01a05fde-b3c6-7eca-81ad-58860a2adcd0",
  pageTypeSlug: "temper-set",
  slug: "war-machine",
  title: "War Machine",
  key: "war-machine",
  esoSetId: 331,
  subcategoryId: "trial",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

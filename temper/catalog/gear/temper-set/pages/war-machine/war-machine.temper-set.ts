import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const warMachine = {
  id: "019e66ec-7f0b-7eed-b54a-642ed05a7282",
  type: "page-type/temper-set",
  slug: "war-machine",
  title: "War Machine",
  key: "war-machine",
  esoSetId: 331,
  category: "temper-set-category/trial",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

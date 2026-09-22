import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const eternalWarrior = {
  id: "019e66ec-7afd-70a5-ab5b-92eb49017547",
  type: "page-type/temper-set",
  slug: "eternal-warrior",
  title: "Eternal Warrior",
  key: "eternal-warrior",
  esoSetId: 171,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

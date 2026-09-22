import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const defendingWarrior = {
  id: "019e66ec-7abb-796d-b848-44be964ff0d0",
  type: "page-type/temper-set",
  slug: "defending-warrior",
  title: "Defending Warrior",
  key: "defending-warrior",
  esoSetId: 138,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

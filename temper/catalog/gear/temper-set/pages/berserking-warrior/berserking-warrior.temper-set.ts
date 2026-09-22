import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const berserkingWarrior = {
  id: "019e66ec-7a70-7bd0-90e0-de680bcd3ba7",
  type: "page-type/temper-set",
  slug: "berserking-warrior",
  title: "Berserking Warrior",
  key: "berserking-warrior",
  esoSetId: 137,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

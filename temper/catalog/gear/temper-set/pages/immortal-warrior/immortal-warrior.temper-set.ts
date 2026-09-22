import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const immortalWarrior = {
  id: "019e66ec-7b45-7304-944e-5104b712d901",
  type: "page-type/temper-set",
  slug: "immortal-warrior",
  title: "Immortal Warrior",
  key: "immortal-warrior",
  esoSetId: 136,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

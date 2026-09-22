import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const poisonousSerpent = {
  id: "019e66ec-7e0c-7c28-ae1f-756622dbd709",
  type: "page-type/temper-set",
  slug: "poisonous-serpent",
  title: "Poisonous Serpent",
  key: "poisonous-serpent",
  esoSetId: 143,
  category: "temper-set-category/trial",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

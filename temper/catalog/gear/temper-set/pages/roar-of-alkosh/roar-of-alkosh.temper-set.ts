import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const roarOfAlkosh = {
  id: "019e66ec-7e2a-7386-9825-7996114c9bb3",
  type: "page-type/temper-set",
  slug: "roar-of-alkosh",
  title: "Roar of Alkosh",
  key: "roar-of-alkosh",
  esoSetId: 232,
  category: "temper-set-category/trial",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

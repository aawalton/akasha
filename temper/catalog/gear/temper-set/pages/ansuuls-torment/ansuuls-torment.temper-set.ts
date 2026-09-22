import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ansuulsTorment = {
  id: "019e66ec-7a36-79c4-86d5-f6308838774f",
  type: "page-type/temper-set",
  slug: "ansuuls-torment",
  title: "Ansuul's Torment",
  key: "ansuuls-torment",
  esoSetId: 702,
  category: "temper-set-category/trial",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const xorynsMasterpiece = {
  id: "019e66ec-7f3a-773a-837f-659aa850d489",
  type: "page-type/temper-set",
  slug: "xoryns-masterpiece",
  title: "Xoryn's Masterpiece",
  key: "xoryns-masterpiece",
  esoSetId: 769,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const theMoragTong = {
  id: "019e66ec-797c-7561-83dd-845686823519",
  type: "page-type/temper-set",
  slug: "the-morag-tong",
  title: "The Morag Tong",
  key: "the-morag-tong",
  esoSetId: 50,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

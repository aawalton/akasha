import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const marksmansCrest = {
  id: "019e66ec-780f-7936-9456-00ffc220186c",
  type: "page-type/temper-set",
  slug: "marksmans-crest",
  title: "Marksman's Crest",
  key: "marksmans-crest",
  esoSetId: 234,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

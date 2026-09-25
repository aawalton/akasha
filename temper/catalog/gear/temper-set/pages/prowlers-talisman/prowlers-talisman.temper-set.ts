import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const prowlersTalisman = {
  id: "01a0d94a-c1f9-739f-864b-f300ae326424",
  type: "page-type/temper-set",
  slug: "prowlers-talisman",
  title: "Prowler's Talisman",
  key: "prowlers-talisman",
  esoSetId: 854,
  category: "temper-set-category/mythic",
  valid: ["necklace"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

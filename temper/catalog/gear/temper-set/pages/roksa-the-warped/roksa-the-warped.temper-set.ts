import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const roksaTheWarped = {
  id: "019e6484-6011-7dba-bc5a-b8fd5b596ca9",
  type: "page-type/temper-set",
  slug: "roksa-the-warped",
  title: "Roksa the Warped",
  key: "roksa-the-warped",
  esoSetId: 683,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

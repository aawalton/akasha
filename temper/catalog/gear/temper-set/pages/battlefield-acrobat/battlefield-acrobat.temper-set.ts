import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const battlefieldAcrobat = {
  id: "019e66ec-764b-7068-bfe7-2f1261441e0e",
  type: "page-type/temper-set",
  slug: "battlefield-acrobat",
  title: "Battlefield Acrobat",
  key: "battlefield-acrobat",
  esoSetId: 419,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

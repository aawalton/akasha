import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const dovRhaSabatons = {
  id: "019e6484-602a-74d2-9fe6-5d7a7096ee64",
  type: "page-type/temper-set",
  slug: "dov-rha-sabatons",
  title: "Dov-rha Sabatons",
  key: "dov-rha-sabatons",
  esoSetId: 655,
  category: "temper-set-category/mythic",
  valid: ["feet:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

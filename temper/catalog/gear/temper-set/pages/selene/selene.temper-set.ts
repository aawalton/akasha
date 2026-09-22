import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const selene = {
  id: "019e6484-6013-7b64-9cdc-76a602968d5f",
  type: "page-type/temper-set",
  slug: "selene",
  title: "Selene",
  key: "selene",
  esoSetId: 279,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

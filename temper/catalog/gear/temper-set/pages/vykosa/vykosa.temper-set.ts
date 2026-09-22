import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const vykosa = {
  id: "019e6484-6023-7be5-bdc9-8b82c7dfb234",
  type: "page-type/temper-set",
  slug: "vykosa",
  title: "Vykosa",
  key: "vykosa",
  esoSetId: 398,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const kargaeda = {
  id: "019e6484-5ffe-7d77-a538-74be1fae7ce4",
  type: "page-type/temper-set",
  slug: "kargaeda",
  title: "Kargaeda",
  key: "kargaeda",
  esoSetId: 632,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

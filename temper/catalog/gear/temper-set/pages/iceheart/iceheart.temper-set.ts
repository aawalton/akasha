import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const iceheart = {
  id: "019e6484-5ffb-7041-8601-b4cfcaf14038",
  type: "page-type/temper-set",
  slug: "iceheart",
  title: "Iceheart",
  key: "iceheart",
  esoSetId: 274,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

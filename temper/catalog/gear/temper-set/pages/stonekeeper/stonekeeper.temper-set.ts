import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const stonekeeper = {
  id: "019e6484-601a-741b-b115-c0a65f331f96",
  type: "page-type/temper-set",
  slug: "stonekeeper",
  title: "Stonekeeper",
  key: "stonekeeper",
  esoSetId: 432,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

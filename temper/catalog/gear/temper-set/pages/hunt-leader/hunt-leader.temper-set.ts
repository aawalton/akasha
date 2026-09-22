import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const huntLeader = {
  id: "019e6484-5fb5-77b5-a7bb-2e1227a8bd0c",
  type: "page-type/temper-set",
  slug: "hunt-leader",
  title: "Hunt Leader",
  key: "hunt-leader",
  esoSetId: 216,
  category: "temper-set-category/arena",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const earthgore = {
  id: "019e6484-5ff3-7d78-a5bf-cb43c78d41b1",
  type: "page-type/temper-set",
  slug: "earthgore",
  title: "Earthgore",
  key: "earthgore",
  esoSetId: 341,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const cryptcanonVestments = {
  id: "019e6484-6028-76b1-b968-c2db0d0ac512",
  type: "page-type/temper-set",
  slug: "cryptcanon-vestments",
  title: "Cryptcanon Vestments",
  key: "cryptcanon-vestments",
  esoSetId: 691,
  category: "temper-set-category/mythic",
  valid: ["chest:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

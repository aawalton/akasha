import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const symphonyOfBlades = {
  id: "019e6484-601d-71b7-949b-7e0780f2fae9",
  type: "page-type/temper-set",
  slug: "symphony-of-blades",
  title: "Symphony of Blades",
  key: "symphony-of-blades",
  esoSetId: 436,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

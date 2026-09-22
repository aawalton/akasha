import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wardOfCyrodiil = {
  id: "019e66ec-79de-7618-98ff-fb21dc76f701",
  type: "page-type/temper-set",
  slug: "ward-of-cyrodiil",
  title: "Ward of Cyrodiil",
  key: "ward-of-cyrodiil",
  esoSetId: 111,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

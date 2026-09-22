import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const magmaIncarnate = {
  id: "019e6484-6005-7c9d-b484-31d4bdef80ae",
  type: "page-type/temper-set",
  slug: "magma-incarnate",
  title: "Magma Incarnate",
  key: "magma-incarnate",
  esoSetId: 609,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

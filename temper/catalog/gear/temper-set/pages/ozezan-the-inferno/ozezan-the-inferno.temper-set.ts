import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ozezanTheInferno = {
  id: "019e6484-600f-70ef-afe1-51a02ad789b0",
  type: "page-type/temper-set",
  slug: "ozezan-the-inferno",
  title: "Ozezan the Inferno",
  key: "ozezan-the-inferno",
  esoSetId: 687,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

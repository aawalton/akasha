import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const tremorscale = {
  id: "019e6484-6020-7ef0-b469-a92f1af03ca6",
  type: "page-type/temper-set",
  slug: "tremorscale",
  title: "Tremorscale",
  key: "tremorscale",
  esoSetId: 276,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

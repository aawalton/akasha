import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const harpoonersWadingKilt = {
  id: "019e6484-602e-7043-895a-166b947d21e2",
  type: "page-type/temper-set",
  slug: "harpooners-wading-kilt",
  title: "Harpooner's Wading Kilt",
  key: "harpooners-wading-kilt",
  esoSetId: 594,
  category: "temper-set-category/mythic",
  valid: ["legs:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

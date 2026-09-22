import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const lefthandersAegisBelt = {
  id: "019e6484-602e-7ed5-9334-3cdff22510e8",
  type: "page-type/temper-set",
  slug: "lefthanders-aegis-belt",
  title: "Lefthander's Aegis Belt",
  key: "lefthanders-aegis-belt",
  esoSetId: 656,
  category: "temper-set-category/mythic",
  valid: ["waist:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const graveStakeCollector = {
  id: "019e668e-9a46-75a1-9ad0-14b98eb8bd04",
  type: "page-type/temper-set",
  slug: "grave-stake-collector",
  title: "Grave-Stake Collector",
  key: "grave-stake-collector",
  esoSetId: 408,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

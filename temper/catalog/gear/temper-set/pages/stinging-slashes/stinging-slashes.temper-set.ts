import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const stingingSlashes = {
  id: "019e6484-5fd5-75d6-b949-b347d26d5ff6",
  type: "page-type/temper-set",
  slug: "stinging-slashes",
  title: "Stinging Slashes",
  key: "stinging-slashes",
  esoSetId: 315,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

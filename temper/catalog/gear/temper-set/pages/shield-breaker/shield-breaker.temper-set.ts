import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const shieldBreaker = {
  id: "019e66ec-7900-7679-bda1-f878b25f38bb",
  type: "page-type/temper-set",
  slug: "shield-breaker",
  title: "Shield Breaker",
  key: "shield-breaker",
  esoSetId: 199,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

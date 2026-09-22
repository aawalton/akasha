import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const explosiveRebuke = {
  id: "019e6484-5fab-7a61-84a2-2e65af7d1885",
  type: "page-type/temper-set",
  slug: "explosive-rebuke",
  title: "Explosive Rebuke",
  key: "explosive-rebuke",
  esoSetId: 544,
  category: "temper-set-category/arena",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

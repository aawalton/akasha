import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const unflinchingUltimate = {
  id: "019e66e7-6a26-771d-a8dc-dc3ff4b4e5cc",
  type: "page-type/temper-set",
  slug: "unflinching-ultimate",
  title: "Unflinching Ultimate",
  key: "unflinching-ultimate",
  esoSetId: 832,
  category: "temper-set-category/no-type",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

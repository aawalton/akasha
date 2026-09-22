import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const arkaysCharity = {
  id: "019e66e7-69f9-75fa-a40b-e16b0eaa65ba",
  type: "page-type/temper-set",
  slug: "arkays-charity",
  title: "Arkay's Charity",
  key: "arkays-charity",
  esoSetId: 802,
  category: "temper-set-category/no-type",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

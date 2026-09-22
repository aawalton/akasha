import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const sharedBurden = {
  id: "019e66e7-6a1d-7e97-a936-9e0475278d7d",
  type: "page-type/temper-set",
  slug: "shared-burden",
  title: "Shared Burden",
  key: "shared-burden",
  esoSetId: 808,
  category: "temper-set-category/no-type",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

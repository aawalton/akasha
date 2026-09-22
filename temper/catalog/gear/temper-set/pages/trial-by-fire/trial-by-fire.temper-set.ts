import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const trialByFire = {
  id: "019e668e-9a6e-73cb-8573-fd7cec7a033b",
  type: "page-type/temper-set",
  slug: "trial-by-fire",
  title: "Trial by Fire",
  key: "trial-by-fire",
  esoSetId: 208,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

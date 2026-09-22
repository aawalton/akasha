import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wretchedVitality = {
  id: "019e668e-9a77-7cff-a097-e2803b49d27d",
  type: "page-type/temper-set",
  slug: "wretched-vitality",
  title: "Wretched Vitality",
  key: "wretched-vitality",
  esoSetId: 610,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

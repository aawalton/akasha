import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const kagrenacsHope = {
  id: "019e668e-9a4d-7367-99ed-016a9515db13",
  type: "page-type/temper-set",
  slug: "kagrenacs-hope",
  title: "Kagrenac's Hope",
  key: "kagrenacs-hope",
  esoSetId: 92,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

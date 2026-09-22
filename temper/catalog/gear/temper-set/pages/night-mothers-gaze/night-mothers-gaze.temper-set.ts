import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nightMothersGaze = {
  id: "019e668e-9a56-73f1-8d14-b7e0a72b37db",
  type: "page-type/temper-set",
  slug: "night-mothers-gaze",
  title: "Night Mother's Gaze",
  key: "night-mothers-gaze",
  esoSetId: 51,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

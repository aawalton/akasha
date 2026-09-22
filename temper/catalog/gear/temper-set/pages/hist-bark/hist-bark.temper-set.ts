import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const histBark = {
  id: "019e668e-9a48-7ea7-affa-cb477bd4a043",
  type: "page-type/temper-set",
  slug: "hist-bark",
  title: "Hist Bark",
  key: "hist-bark",
  esoSetId: 78,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

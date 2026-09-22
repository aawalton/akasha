import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const heartlandConqueror = {
  id: "019e668e-9a47-7334-a8fe-0040c5cc9e43",
  type: "page-type/temper-set",
  slug: "heartland-conqueror",
  title: "Heartland Conqueror",
  key: "heartland-conqueror",
  esoSetId: 583,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

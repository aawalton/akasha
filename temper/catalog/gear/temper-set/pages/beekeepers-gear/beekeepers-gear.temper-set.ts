import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const beekeepersGear = {
  id: "019e66e7-6a47-737d-aed5-99f54cc1fc12",
  type: "page-type/temper-set",
  slug: "beekeepers-gear",
  title: "Beekeeper's Gear",
  key: "beekeepers-gear",
  esoSetId: 288,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

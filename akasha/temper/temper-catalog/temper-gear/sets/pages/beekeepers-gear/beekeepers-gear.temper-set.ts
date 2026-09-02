import type { TemperSet } from "../../temper-set.page-type.ts"

export const beekeepersGear = {
  id: "01a05fda-02f0-7677-834b-5612b81e4c2b",
  pageTypeSlug: "temper-set",
  slug: "beekeepers-gear",
  title: "Beekeeper's Gear",
  key: "beekeepers-gear",
  esoSetId: 288,
  subcategoryId: "overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

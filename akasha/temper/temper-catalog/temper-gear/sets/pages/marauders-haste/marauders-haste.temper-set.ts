import type { TemperSet } from "../../temper-set.page-type.ts"

export const maraudersHaste = {
  id: "01a05fdb-7d3a-7cbe-b1f5-bfd1b4ab73de",
  pageTypeSlug: "temper-set",
  slug: "marauders-haste",
  title: "Marauder's Haste",
  key: "marauders-haste",
  esoSetId: 466,
  subcategoryId: "overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

import type { TemperSet } from "../../temper-set.page-type.ts"

export const meridiasBlessedArmor = {
  id: "01a05fdb-7d3e-718c-bdf4-47c2aa1355fc",
  pageTypeSlug: "temper-set",
  slug: "meridias-blessed-armor",
  title: "Meridia's Blessed Armor",
  key: "meridias-blessed-armor",
  esoSetId: 94,
  subcategoryId: "overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

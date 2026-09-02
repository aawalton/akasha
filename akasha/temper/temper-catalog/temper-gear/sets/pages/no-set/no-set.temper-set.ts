import type { TemperSet } from "../../temper-set.page-type.ts"

export const noSet = {
  id: "01a05fdb-7d4b-78d4-8393-7bd05ff0a4bb",
  pageTypeSlug: "temper-set",
  slug: "no-set",
  title: "No Set",
  key: "no-set",
  esoSetId: 0,
  subcategoryId: "none",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

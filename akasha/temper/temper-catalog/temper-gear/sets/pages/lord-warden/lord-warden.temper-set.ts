import type { TemperSet } from "../../temper-set.page-type.ts"

export const lordWarden = {
  id: "01a05fdb-7d34-7c10-8a82-a0479a87a4e4",
  pageTypeSlug: "temper-set",
  slug: "lord-warden",
  title: "Lord Warden",
  key: "lord-warden",
  esoSetId: 164,
  subcategoryId: "monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet

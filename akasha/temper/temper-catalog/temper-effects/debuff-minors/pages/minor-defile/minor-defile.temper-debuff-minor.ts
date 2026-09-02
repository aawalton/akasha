import type { TemperDebuffMinor } from "../../temper-debuff-minor.page-type.ts"

export const minorDefile = {
  id: "01a05fc6-42c3-76b9-ba94-9d01803ece96",
  pageTypeSlug: "temper-debuff-minor",
  slug: "minor-defile",
  title: "Minor Defile",
  key: "minor-defile",
  description: "Reduces healing received and damage shield strength by 6%",
  effects: "jsonl",
} as const satisfies TemperDebuffMinor

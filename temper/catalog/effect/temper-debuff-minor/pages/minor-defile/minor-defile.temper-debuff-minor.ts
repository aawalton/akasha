import type { TemperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.types.ts"

export const minorDefile = {
  id: "01a05fc6-42c3-76b9-ba94-9d01803ece96",
  type: "page-type/temper-debuff-minor",
  slug: "minor-defile",
  title: "Minor Defile",
  key: "minor-defile",
  effectCategory: "healing",
  description: "Reduces healing received and damage shield strength by 6%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.875Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperDebuffMinor

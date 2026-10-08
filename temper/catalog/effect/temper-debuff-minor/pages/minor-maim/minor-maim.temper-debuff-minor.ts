import type { TemperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.types.ts"

export const minorMaim = {
  id: "01a05fc6-42c5-7e88-880a-fe6da59ba896",
  type: "page-type/temper-debuff-minor",
  slug: "minor-maim",
  title: "Minor Maim",
  key: "minor-maim",
  effectCategory: "protection",
  description: "Reduces damage done by 5%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.877Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperDebuffMinor

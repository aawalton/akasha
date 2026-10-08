import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorSlayer = {
  id: "01a05fc5-f6c1-7a93-8775-4314ab78460b",
  type: "page-type/temper-buff-minor",
  slug: "minor-slayer",
  title: "Minor Slayer",
  key: "minor-slayer",
  description: "Increases damage done to Dungeon, Trial, and Arena monsters by 5%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.417Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperBuffMinor

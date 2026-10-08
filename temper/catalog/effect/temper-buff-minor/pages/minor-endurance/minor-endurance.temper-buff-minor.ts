import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorEndurance = {
  id: "01a05fc5-f6be-7847-8a03-7ba959b5b8d3",
  type: "page-type/temper-buff-minor",
  slug: "minor-endurance",
  title: "Minor Endurance",
  key: "minor-endurance",
  description: "Increases Stamina Recovery by 15%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.414Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperBuffMinor

import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorForce = {
  id: "01a05fc5-f6be-70f8-aec6-a8330fe4c092",
  type: "page-type/temper-buff-minor",
  slug: "minor-force",
  title: "Minor Force",
  key: "minor-force",
  description: "Increases Critical Damage by 10%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.414Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperBuffMinor

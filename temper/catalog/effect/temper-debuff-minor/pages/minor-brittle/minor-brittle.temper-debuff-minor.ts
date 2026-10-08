import type { TemperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.types.ts"

export const minorBrittle = {
  id: "01a05fc6-42c3-744b-a88f-35d6354c5588",
  type: "page-type/temper-debuff-minor",
  slug: "minor-brittle",
  title: "Minor Brittle",
  key: "minor-brittle",
  description: "Increases Critical Damage taken by 10%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.875Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffMinor

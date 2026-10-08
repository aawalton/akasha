import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorVitality = {
  id: "01a05fc5-f6c2-7095-abd0-326f5461266e",
  type: "page-type/temper-buff-minor",
  slug: "minor-vitality",
  title: "Minor Vitality",
  key: "minor-vitality",
  description: "Increases healing received and damage shield strength by 6%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.418Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperBuffMinor

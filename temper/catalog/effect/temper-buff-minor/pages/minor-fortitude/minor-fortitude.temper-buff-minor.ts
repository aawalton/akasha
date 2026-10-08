import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorFortitude = {
  id: "01a05fc5-f6bf-7e18-a218-1d993c45c46a",
  type: "page-type/temper-buff-minor",
  slug: "minor-fortitude",
  title: "Minor Fortitude",
  key: "minor-fortitude",
  effectCategory: "healing",
  description: "Increases Health Recovery by 15%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.415Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperBuffMinor

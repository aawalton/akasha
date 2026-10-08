import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorToughness = {
  id: "01a05fc5-f6c2-7285-b4a6-155081e13cdc",
  type: "page-type/temper-buff-minor",
  slug: "minor-toughness",
  title: "Minor Toughness",
  key: "minor-toughness",
  description: "Increases Max Health by 10%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.418Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperBuffMinor

import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorBrutality = {
  id: "01a05fc5-f6bd-73a2-9b1d-f09337a676a4",
  type: "page-type/temper-buff-minor",
  slug: "minor-brutality",
  title: "Minor Brutality",
  key: "minor-brutality",
  effectCategory: "damage",
  description: "Increases Weapon Damage by 10%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.413Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperBuffMinor

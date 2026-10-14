import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorBrutality = {
  id: "01a05fc5-f6bd-73a2-9b1d-f09337a676a4",
  type: "page-type/temper-buff-minor",
  slug: "minor-brutality",
  title: "Minor Brutality",
  key: "minor-brutality",
  effectCategory: "damage",
  description: "Increases Weapon and Spell Damage by 10%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.413Z",
  updatedAt: "2026-10-14T14:27:21.483Z",
} as const satisfies TemperBuffMinor

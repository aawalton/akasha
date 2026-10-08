import type { TemperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorSorcery = {
  id: "01a05fc5-f6c1-7428-8099-1d50e48f24d1",
  type: "page-type/temper-buff-minor",
  slug: "minor-sorcery",
  title: "Minor Sorcery",
  key: "minor-sorcery",
  effectCategory: "damage",
  description: "Increases Spell Damage by 10%",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:04.417Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperBuffMinor

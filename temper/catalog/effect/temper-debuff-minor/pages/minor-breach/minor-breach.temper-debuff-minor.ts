import type { TemperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.types.ts"

export const minorBreach = {
  id: "01a05fc6-42c3-7812-aaf2-932690fda4df",
  type: "page-type/temper-debuff-minor",
  slug: "minor-breach",
  title: "Minor Breach",
  key: "minor-breach",
  effectCategory: "damage",
  description: "Reduces Physical and Spell Resistance by 2974",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.875Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperDebuffMinor

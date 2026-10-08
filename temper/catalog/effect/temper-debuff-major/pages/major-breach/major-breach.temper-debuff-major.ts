import type { TemperDebuffMajor } from "akasha/temper/catalog/effect/temper-debuff-major/temper-debuff-major.page-type.types.ts"

export const majorBreach = {
  id: "01a05fc6-42c0-7fff-b0a0-4526f19bc5d5",
  type: "page-type/temper-debuff-major",
  slug: "major-breach",
  title: "Major Breach",
  key: "major-breach",
  effectCategory: "damage",
  description: "Reduces Physical and Spell Resistance by 5948",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.872Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies TemperDebuffMajor

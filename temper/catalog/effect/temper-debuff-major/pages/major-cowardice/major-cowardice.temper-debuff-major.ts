import type { TemperDebuffMajor } from "akasha/temper/catalog/effect/temper-debuff-major/temper-debuff-major.page-type.types.ts"

export const majorCowardice = {
  id: "01a05fc6-42c1-76c0-88d6-6d8ca070c380",
  type: "page-type/temper-debuff-major",
  slug: "major-cowardice",
  title: "Major Cowardice",
  key: "major-cowardice",
  description: "Reduces Weapon and Spell Damage by 430",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.873Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffMajor

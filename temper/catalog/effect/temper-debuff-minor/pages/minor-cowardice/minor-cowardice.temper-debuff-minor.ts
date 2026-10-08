import type { TemperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.types.ts"

export const minorCowardice = {
  id: "01a05fc6-42c3-7215-bb24-ae4cf64b44da",
  type: "page-type/temper-debuff-minor",
  slug: "minor-cowardice",
  title: "Minor Cowardice",
  key: "minor-cowardice",
  description: "Reduces Weapon and Spell Damage by 215",
  effects: "jsonl",
  createdAt: "2026-09-02T01:40:23.875Z",
  updatedAt: "2026-09-21T15:25:48.000Z",
} as const satisfies TemperDebuffMinor

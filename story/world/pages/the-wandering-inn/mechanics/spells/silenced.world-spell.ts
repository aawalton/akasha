import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const silenced = {
  id: "01a06572-95e1-7e2c-a69d-7e4da24f3d8c",
  type: "page-type/world-spell",
  slug: "silenced",
  title: "Silenced",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

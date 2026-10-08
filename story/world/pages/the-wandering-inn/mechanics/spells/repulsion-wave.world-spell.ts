import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const repulsionWave = {
  id: "01a06572-95dd-7631-8223-afb94c97866a",
  type: "page-type/world-spell",
  slug: "repulsion-wave",
  title: "Repulsion Wave",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.421Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const repulsionBarrier = {
  id: "01a06572-95dd-7121-876f-21c17432938f",
  type: "page-type/world-spell",
  slug: "repulsion-barrier",
  title: "Repulsion Barrier",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.421Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

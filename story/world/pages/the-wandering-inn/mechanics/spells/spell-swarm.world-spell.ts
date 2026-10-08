import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellSwarm = {
  id: "01a06572-95e2-7a64-ba5d-d75dc59e29af",
  type: "page-type/world-spell",
  slug: "spell-swarm",
  title: "Spell Swarm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

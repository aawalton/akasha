import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spellSwarm = {
  id: "01a06572-95e2-7a64-ba5d-d75dc59e29af",
  type: "world-spell",
  slug: "spell-swarm",
  title: "Spell Swarm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

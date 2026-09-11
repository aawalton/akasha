import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fishSwarm = {
  id: "01a06572-95c3-7ff1-b14c-7e5fb57c86f3",
  type: "world-spell",
  slug: "fish-swarm",
  title: "Fish Swarm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

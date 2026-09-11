import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const meteorSwarm = {
  id: "01a06572-95d8-7419-9d50-1f9e298fe1ce",
  type: "world-spell",
  slug: "meteor-swarm",
  title: "Meteor Swarm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

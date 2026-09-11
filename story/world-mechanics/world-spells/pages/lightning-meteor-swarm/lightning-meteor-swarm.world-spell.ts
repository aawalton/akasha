import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightningMeteorSwarm = {
  id: "01a06572-95d0-701f-8c70-b79742f50e06",
  type: "world-spell",
  slug: "lightning-meteor-swarm",
  title: "Lightning Meteor Swarm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

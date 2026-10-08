import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightningMeteorSwarm = {
  id: "01a06572-95d0-701f-8c70-b79742f50e06",
  type: "page-type/world-spell",
  slug: "lightning-meteor-swarm",
  title: "Lightning Meteor Swarm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.408Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell

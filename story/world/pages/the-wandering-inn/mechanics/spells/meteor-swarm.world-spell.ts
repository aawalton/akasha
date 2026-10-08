import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const meteorSwarm = {
  id: "01a06572-95d8-7419-9d50-1f9e298fe1ce",
  type: "page-type/world-spell",
  slug: "meteor-swarm",
  title: "Meteor Swarm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.416Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell

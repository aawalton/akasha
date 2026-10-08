import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostboltSwarm = {
  id: "01a06572-95c5-7002-b207-060063b5b1ea",
  type: "page-type/world-spell",
  slug: "frostbolt-swarm",
  title: "Frostbolt Swarm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell

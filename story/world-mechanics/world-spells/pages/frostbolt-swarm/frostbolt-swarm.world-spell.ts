import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const frostboltSwarm = {
  id: "01a06572-95c5-7002-b207-060063b5b1ea",
  type: "world-spell",
  slug: "frostbolt-swarm",
  title: "Frostbolt Swarm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

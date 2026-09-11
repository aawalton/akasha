import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const swarmOfPestilence = {
  id: "01a06572-95e4-7ed7-b289-b3652b2592e9",
  type: "world-spell",
  slug: "swarm-of-pestilence",
  title: "Swarm of Pestilence",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

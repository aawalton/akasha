import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const swarmOfPestilence = {
  id: "01a06572-95e4-7ed7-b289-b3652b2592e9",
  type: "page-type/world-spell",
  slug: "swarm-of-pestilence",
  title: "Swarm of Pestilence",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.428Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell

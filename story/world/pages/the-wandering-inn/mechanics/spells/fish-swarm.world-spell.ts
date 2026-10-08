import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fishSwarm = {
  id: "01a06572-95c3-7ff1-b14c-7e5fb57c86f3",
  type: "page-type/world-spell",
  slug: "fish-swarm",
  title: "Fish Swarm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell

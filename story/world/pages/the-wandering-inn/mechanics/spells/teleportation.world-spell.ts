import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const teleportation = {
  id: "01a06572-95e6-7daa-8bca-3456adf781f0",
  type: "page-type/world-spell",
  slug: "teleportation",
  title: "Teleportation",
  world: "world/the-wandering-inn",
  appearanceCount: 19,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell

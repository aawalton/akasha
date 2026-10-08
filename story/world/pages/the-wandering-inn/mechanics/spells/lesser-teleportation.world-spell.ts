import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lesserTeleportation = {
  id: "01a06572-95cd-7ac3-9434-9900685ff962",
  type: "page-type/world-spell",
  slug: "lesser-teleportation",
  title: "Lesser Teleportation",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.405Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell

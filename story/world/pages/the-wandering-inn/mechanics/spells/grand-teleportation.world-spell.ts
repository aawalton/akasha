import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const grandTeleportation = {
  id: "01a06572-95c6-7ecd-bf9c-84fd6f662708",
  type: "page-type/world-spell",
  slug: "grand-teleportation",
  title: "Grand Teleportation",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell

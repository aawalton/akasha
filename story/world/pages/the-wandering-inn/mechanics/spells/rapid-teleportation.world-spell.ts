import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rapidTeleportation = {
  id: "01a06572-95dc-7f6f-9f84-91bebcbb29be",
  type: "page-type/world-spell",
  slug: "rapid-teleportation",
  title: "Rapid Teleportation",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.420Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell

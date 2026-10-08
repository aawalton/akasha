import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const emergencyTeleport = {
  id: "01a06572-95bf-7584-93d0-dd3652d3df59",
  type: "page-type/world-spell",
  slug: "emergency-teleport",
  title: "Emergency Teleport",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

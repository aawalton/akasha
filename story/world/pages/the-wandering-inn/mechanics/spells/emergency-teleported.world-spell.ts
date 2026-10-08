import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const emergencyTeleported = {
  id: "01a06572-95bf-74ed-8e25-33bc84b873e5",
  type: "page-type/world-spell",
  slug: "emergency-teleported",
  title: "Emergency Teleported",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

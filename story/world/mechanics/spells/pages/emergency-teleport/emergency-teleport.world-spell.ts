import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const emergencyTeleport = {
  id: "01a06572-95bf-7584-93d0-dd3652d3df59",
  type: "page-type/world-spell",
  slug: "emergency-teleport",
  title: "Emergency Teleport",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

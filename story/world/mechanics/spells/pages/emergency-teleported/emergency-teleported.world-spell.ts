import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const emergencyTeleported = {
  id: "01a06572-95bf-74ed-8e25-33bc84b873e5",
  type: "page-type/world-spell",
  slug: "emergency-teleported",
  title: "Emergency Teleported",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

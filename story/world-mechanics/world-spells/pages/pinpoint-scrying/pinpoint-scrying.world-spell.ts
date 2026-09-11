import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const pinpointScrying = {
  id: "01a06572-95db-76ca-86be-e891e50f8925",
  type: "world-spell",
  slug: "pinpoint-scrying",
  title: "Pinpoint Scrying",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

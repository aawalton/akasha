import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const pinpointSpellNeedleSPrecision = {
  id: "01a06572-95db-7083-848f-65d348e27b1a",
  type: "page-type/world-spell",
  slug: "pinpoint-spell-needle-s-precision",
  title: "Pinpoint Spell: Needle’s Precision",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

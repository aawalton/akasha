import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const completeSilence = {
  id: "01a06572-95b9-7c61-8559-3b2e21b63d76",
  type: "page-type/world-spell",
  slug: "complete-silence",
  title: "Complete Silence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

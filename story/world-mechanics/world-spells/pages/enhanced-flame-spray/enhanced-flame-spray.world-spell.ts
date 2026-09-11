import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const enhancedFlameSpray = {
  id: "01a06572-95bf-70d2-9294-7e46e315b276",
  type: "world-spell",
  slug: "enhanced-flame-spray",
  title: "Enhanced Flame Spray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

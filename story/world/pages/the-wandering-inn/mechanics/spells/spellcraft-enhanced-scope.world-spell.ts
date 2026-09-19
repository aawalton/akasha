import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellcraftEnhancedScope = {
  id: "01a06572-95e2-7de2-82f1-c284459b1103",
  type: "page-type/world-spell",
  slug: "spellcraft-enhanced-scope",
  title: "Spellcraft: Enhanced Scope",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

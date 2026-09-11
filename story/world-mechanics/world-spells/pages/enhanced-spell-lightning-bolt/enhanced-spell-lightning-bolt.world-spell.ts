import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const enhancedSpellLightningBolt = {
  id: "01a06572-95bf-75c9-8d8e-353c3870094c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "enhanced-spell-lightning-bolt",
  title: "Enhanced Spell: Lightning Bolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

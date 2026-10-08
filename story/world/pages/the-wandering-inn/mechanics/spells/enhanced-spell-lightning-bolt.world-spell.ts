import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const enhancedSpellLightningBolt = {
  id: "01a06572-95bf-75c9-8d8e-353c3870094c",
  type: "page-type/world-spell",
  slug: "enhanced-spell-lightning-bolt",
  title: "Enhanced Spell: Lightning Bolt",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const shipSpellDepthExplosion = {
  id: "01a06572-95e0-78fd-9461-0cd878dfac65",
  type: "world-spell",
  slug: "ship-spell-depth-explosion",
  title: "Ship Spell: Depth Explosion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

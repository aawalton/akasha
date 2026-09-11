import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const implosionWell = {
  id: "01a06572-95cb-7055-94af-c46d93390d1b",
  type: "world-spell",
  slug: "implosion-well",
  title: "Implosion Well",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

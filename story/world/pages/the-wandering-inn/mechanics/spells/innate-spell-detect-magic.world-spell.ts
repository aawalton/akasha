import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const innateSpellDetectMagic = {
  id: "01a06572-95cb-77ea-96d3-74bc3158cfa7",
  type: "page-type/world-spell",
  slug: "innate-spell-detect-magic",
  title: "Innate Spell: Detect Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

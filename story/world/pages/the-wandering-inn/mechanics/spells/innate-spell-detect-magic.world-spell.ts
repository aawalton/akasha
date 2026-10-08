import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const innateSpellDetectMagic = {
  id: "01a06572-95cb-77ea-96d3-74bc3158cfa7",
  type: "page-type/world-spell",
  slug: "innate-spell-detect-magic",
  title: "Innate Spell: Detect Magic",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell

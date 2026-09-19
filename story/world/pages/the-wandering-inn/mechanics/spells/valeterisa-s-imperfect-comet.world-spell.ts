import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const valeterisaSImperfectComet = {
  id: "01a06572-95e8-7a54-b646-1510fa0059e2",
  type: "page-type/world-spell",
  slug: "valeterisa-s-imperfect-comet",
  title: "Valeterisa’s Imperfect Comet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

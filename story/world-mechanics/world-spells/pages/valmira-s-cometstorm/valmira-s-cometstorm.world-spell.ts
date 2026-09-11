import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const valmiraSCometstorm = {
  id: "01a06572-95e8-73e1-8eb5-16ded8d201c6",
  type: "world-spell",
  slug: "valmira-s-cometstorm",
  title: "Valmira’s Cometstorm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

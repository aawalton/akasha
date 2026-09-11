import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const arrowOfLight = {
  id: "01a06572-95b4-7e2b-b565-e597122b35e2",
  type: "world-spell",
  slug: "arrow-of-light",
  title: "Arrow of Light",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

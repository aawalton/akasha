import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const scythesOfChariel = {
  id: "01a06572-95df-7f2a-b968-09366ebef446",
  type: "world-spell",
  slug: "scythes-of-chariel",
  title: "Scythes of Chariel",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

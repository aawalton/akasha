import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const blinded = {
  id: "01a06572-95b6-7d4c-9a2e-67d27abe8ae4",
  type: "world-spell",
  slug: "blinded",
  title: "Blinded",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

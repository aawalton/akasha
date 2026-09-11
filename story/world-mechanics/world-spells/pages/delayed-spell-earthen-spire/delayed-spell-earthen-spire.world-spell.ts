import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const delayedSpellEarthenSpire = {
  id: "01a06572-95bc-7265-a146-861beb674e27",
  type: "world-spell",
  slug: "delayed-spell-earthen-spire",
  title: "Delayed Spell: Earthen Spire",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

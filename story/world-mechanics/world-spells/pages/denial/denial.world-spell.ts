import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const denial = {
  id: "01a06572-95bc-7393-842b-c369e06ce0b7",
  type: "world-spell",
  slug: "denial",
  title: "Denial",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

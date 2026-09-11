import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const manaHolder = {
  id: "01a06572-95d1-7824-bdb2-c6ee234ed130",
  type: "world-spell",
  slug: "mana-holder",
  title: "Mana Holder",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

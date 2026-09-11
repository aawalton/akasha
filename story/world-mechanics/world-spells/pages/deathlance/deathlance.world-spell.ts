import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const deathlance = {
  id: "01a06572-95bc-7057-b898-7747afa9e58c",
  type: "world-spell",
  slug: "deathlance",
  title: "Deathlance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

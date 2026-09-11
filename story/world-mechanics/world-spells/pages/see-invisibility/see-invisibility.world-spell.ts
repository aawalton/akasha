import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const seeInvisibility = {
  id: "01a06572-95df-7bcb-9661-084a0afa74eb",
  type: "world-spell",
  slug: "see-invisibility",
  title: "See Invisibility",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

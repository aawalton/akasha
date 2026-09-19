import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const theLightOfShaliVere = {
  id: "01a06572-95e6-7e50-a334-f40c9c1651bc",
  type: "page-type/world-spell",
  slug: "the-light-of-shali-vere",
  title: "The Light of Shali’vere",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

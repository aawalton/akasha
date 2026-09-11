import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const burningBlades = {
  id: "01a06572-95b8-7466-b9a3-11d130909c81",
  type: "world-spell",
  slug: "burning-blades",
  title: "Burning Blades",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

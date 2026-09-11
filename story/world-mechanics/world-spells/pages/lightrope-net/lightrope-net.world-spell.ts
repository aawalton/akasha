import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightropeNet = {
  id: "01a06572-95d0-7941-875a-92828a77be27",
  type: "world-spell",
  slug: "lightrope-net",
  title: "Lightrope Net",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

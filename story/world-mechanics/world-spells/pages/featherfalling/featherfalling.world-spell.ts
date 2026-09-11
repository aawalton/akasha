import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const featherfalling = {
  id: "01a06572-95c0-744a-a8a7-394a1d38d8e9",
  type: "world-spell",
  slug: "featherfalling",
  title: "Featherfalling",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

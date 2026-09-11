import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightWalls = {
  id: "01a06572-95ce-7549-925f-7bacdd25a31a",
  type: "world-spell",
  slug: "light-walls",
  title: "Light Walls",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

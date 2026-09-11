import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const seeking = {
  id: "01a06572-95df-7d9a-a94e-b1d0135b7481",
  type: "world-spell",
  slug: "seeking",
  title: "Seeking",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

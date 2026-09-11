import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightball = {
  id: "01a06572-95cf-7134-8f3e-0de7687fb0e2",
  type: "world-spell",
  slug: "lightball",
  title: "Lightball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

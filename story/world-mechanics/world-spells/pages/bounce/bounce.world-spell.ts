import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bounce = {
  id: "01a06572-95b7-72b9-8c6a-4b61b10867cf",
  type: "world-spell",
  slug: "bounce",
  title: "Bounce",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

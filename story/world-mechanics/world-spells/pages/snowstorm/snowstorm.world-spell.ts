import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const snowstorm = {
  id: "01a06572-95e1-70f5-a328-ee5e84a1dc5b",
  type: "world-spell",
  slug: "snowstorm",
  title: "Snowstorm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

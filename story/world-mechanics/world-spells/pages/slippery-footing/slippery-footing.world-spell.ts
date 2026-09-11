import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const slipperyFooting = {
  id: "01a06572-95e1-742b-826c-9476d1087ff9",
  type: "world-spell",
  slug: "slippery-footing",
  title: "Slippery Footing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

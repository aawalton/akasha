import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const waterwalking = {
  id: "01a06572-95e9-7d64-841c-ad6859f878a8",
  type: "world-spell",
  slug: "waterwalking",
  title: "Waterwalking",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

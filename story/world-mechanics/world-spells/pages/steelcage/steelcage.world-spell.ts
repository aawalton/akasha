import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const steelcage = {
  id: "01a06572-95e2-76a5-9d2b-cfaf1610011d",
  type: "world-spell",
  slug: "steelcage",
  title: "Steelcage",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

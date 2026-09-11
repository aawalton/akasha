import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const jetSpray = {
  id: "01a06572-95cc-78be-bfdd-718e88ee6033",
  type: "world-spell",
  slug: "jet-spray",
  title: "Jet Spray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

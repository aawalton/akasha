import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const resistanceToLightning = {
  id: "01a06572-95dd-7e54-a9cc-33b99397126e",
  type: "world-spell",
  slug: "resistance-to-lightning",
  title: "Resistance to Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

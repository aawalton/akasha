import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const deliriousHappiness = {
  id: "01a06572-95bc-7814-be55-6587c6416761",
  type: "page-type/world-spell",
  slug: "delirious-happiness",
  title: "Delirious Happiness",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

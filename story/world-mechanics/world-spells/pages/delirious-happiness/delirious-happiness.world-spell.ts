import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const deliriousHappiness = {
  id: "01a06572-95bc-7814-be55-6587c6416761",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "delirious-happiness",
  title: "Delirious Happiness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

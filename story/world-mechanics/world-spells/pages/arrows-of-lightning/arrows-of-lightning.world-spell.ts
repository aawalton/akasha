import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const arrowsOfLightning = {
  id: "01a06572-95b5-7276-8e1e-f38e90e87ba4",
  type: "world-spell",
  slug: "arrows-of-lightning",
  title: "Arrows of Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

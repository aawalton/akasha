import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bladesOfTheElementalGods = {
  id: "01a06572-95b6-7cae-83da-47ad4f254776",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "blades-of-the-elemental-gods",
  title: "Blades of the Elemental Gods",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

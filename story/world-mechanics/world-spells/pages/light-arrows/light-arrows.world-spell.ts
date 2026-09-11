import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightArrows = {
  id: "01a06572-95cd-7692-a081-91fbe4f6f7ba",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "light-arrows",
  title: "Light Arrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

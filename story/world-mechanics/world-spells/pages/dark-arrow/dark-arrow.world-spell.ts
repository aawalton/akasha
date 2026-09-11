import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const darkArrow = {
  id: "01a06572-95bb-7cd1-ab55-518d9d5ca006",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "dark-arrow",
  title: "Dark Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

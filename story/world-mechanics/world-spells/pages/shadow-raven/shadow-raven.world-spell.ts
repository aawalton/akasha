import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const shadowRaven = {
  id: "01a06572-95df-7b31-aae2-e546816b55eb",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "shadow-raven",
  title: "Shadow Raven",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

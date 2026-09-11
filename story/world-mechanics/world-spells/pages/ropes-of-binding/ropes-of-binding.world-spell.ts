import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const ropesOfBinding = {
  id: "01a06572-95de-74bf-9c94-23a988bd6f6c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ropes-of-binding",
  title: "Ropes of Binding",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

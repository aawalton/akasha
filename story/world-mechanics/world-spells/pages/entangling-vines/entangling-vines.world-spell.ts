import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const entanglingVines = {
  id: "01a06572-95bf-75d7-98f9-99dd7339bee7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "entangling-vines",
  title: "Entangling Vines",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const entanglingVines = {
  id: "01a06572-95bf-75d7-98f9-99dd7339bee7",
  type: "page-type/world-spell",
  slug: "entangling-vines",
  title: "Entangling Vines",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

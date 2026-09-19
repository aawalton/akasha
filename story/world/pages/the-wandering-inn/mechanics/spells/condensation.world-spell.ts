import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const condensation = {
  id: "01a06572-95b9-722a-8b4c-686870208c19",
  type: "page-type/world-spell",
  slug: "condensation",
  title: "Condensation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

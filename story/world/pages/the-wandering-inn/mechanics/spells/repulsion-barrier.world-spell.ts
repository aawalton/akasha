import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const repulsionBarrier = {
  id: "01a06572-95dd-7121-876f-21c17432938f",
  type: "page-type/world-spell",
  slug: "repulsion-barrier",
  title: "Repulsion Barrier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

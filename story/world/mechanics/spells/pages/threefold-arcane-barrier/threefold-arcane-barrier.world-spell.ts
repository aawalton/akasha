import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const threefoldArcaneBarrier = {
  id: "01a06572-95e6-75e4-8cf9-fc5f829331ce",
  type: "page-type/world-spell",
  slug: "threefold-arcane-barrier",
  title: "Threefold Arcane Barrier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const threefoldArcaneBarrier = {
  id: "01a06572-95e6-75e4-8cf9-fc5f829331ce",
  type: "world-spell",
  slug: "threefold-arcane-barrier",
  title: "Threefold Arcane Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const threefoldArcaneBarrier = {
  id: "01a06572-95e6-75e4-8cf9-fc5f829331ce",
  type: "page-type/world-spell",
  slug: "threefold-arcane-barrier",
  title: "Threefold Arcane Barrier",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell

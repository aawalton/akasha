import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const aerialBarrier = {
  id: "01a06572-95b3-789d-98ec-4f030be6ab43",
  type: "world-spell",
  slug: "aerial-barrier",
  title: "Aerial Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

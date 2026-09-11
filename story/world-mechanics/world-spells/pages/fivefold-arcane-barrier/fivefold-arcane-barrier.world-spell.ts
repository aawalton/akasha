import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fivefoldArcaneBarrier = {
  id: "01a06572-95c3-7c25-b56b-82eeda069a6a",
  type: "world-spell",
  slug: "fivefold-arcane-barrier",
  title: "Fivefold Arcane Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

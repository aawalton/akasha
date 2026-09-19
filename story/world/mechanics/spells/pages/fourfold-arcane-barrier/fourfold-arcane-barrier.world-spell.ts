import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fourfoldArcaneBarrier = {
  id: "01a06572-95c5-738a-a2ed-9ae7b00ce680",
  type: "page-type/world-spell",
  slug: "fourfold-arcane-barrier",
  title: "Fourfold Arcane Barrier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

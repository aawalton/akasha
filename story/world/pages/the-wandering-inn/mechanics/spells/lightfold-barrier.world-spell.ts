import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightfoldBarrier = {
  id: "01a06572-95cf-7293-b58d-7adda630147e",
  type: "page-type/world-spell",
  slug: "lightfold-barrier",
  title: "Lightfold Barrier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stoneSpires = {
  id: "01a06572-95e3-7359-9a1e-044d521cd2a5",
  type: "world-spell",
  slug: "stone-spires",
  title: "Stone Spires",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

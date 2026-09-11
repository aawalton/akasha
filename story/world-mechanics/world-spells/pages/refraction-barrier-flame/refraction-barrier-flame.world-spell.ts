import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const refractionBarrierFlame = {
  id: "01a06572-95dc-7edd-9ade-e80ca4c6709c",
  type: "world-spell",
  slug: "refraction-barrier-flame",
  title: "Refraction Barrier: Flame",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

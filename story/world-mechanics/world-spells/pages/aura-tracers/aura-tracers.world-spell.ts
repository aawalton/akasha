import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const auraTracers = {
  id: "01a06572-95b5-7de2-8ad5-af4d0f2a4079",
  type: "world-spell",
  slug: "aura-tracers",
  title: "Aura Tracers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

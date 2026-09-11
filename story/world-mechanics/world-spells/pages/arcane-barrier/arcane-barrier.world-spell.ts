import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const arcaneBarrier = {
  id: "01a06572-95b4-7bb7-8bae-b717282eb6c1",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "arcane-barrier",
  title: "Arcane Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

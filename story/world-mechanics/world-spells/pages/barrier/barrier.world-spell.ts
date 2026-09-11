import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const barrier = {
  id: "01a06572-95b5-7521-9ec5-9a58dc32d1e3",
  type: "world-spell",
  slug: "barrier",
  title: "Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

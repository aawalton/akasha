import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const barrierOfLight = {
  id: "01a06572-95b5-775b-993b-19a935c8c967",
  type: "world-spell",
  slug: "barrier-of-light",
  title: "Barrier of Light",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

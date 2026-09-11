import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const displacement = {
  id: "01a06572-95be-7acb-a3c0-bb62cb147d72",
  type: "world-spell",
  slug: "displacement",
  title: "Displacement",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

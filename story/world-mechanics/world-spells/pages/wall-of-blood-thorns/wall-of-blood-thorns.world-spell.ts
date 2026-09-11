import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const wallOfBloodThorns = {
  id: "01a06572-95e8-723a-a246-881178f6af37",
  type: "world-spell",
  slug: "wall-of-blood-thorns",
  title: "Wall of Blood Thorns",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

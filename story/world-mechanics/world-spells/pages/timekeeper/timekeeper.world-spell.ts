import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const timekeeper = {
  id: "01a06572-95e7-798d-88e9-89e571b1f2d2",
  type: "world-spell",
  slug: "timekeeper",
  title: "Timekeeper",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

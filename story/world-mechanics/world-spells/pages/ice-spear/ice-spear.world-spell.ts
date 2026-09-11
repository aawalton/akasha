import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceSpear = {
  id: "01a06572-95c9-79e5-80fc-32176f665bf2",
  type: "world-spell",
  slug: "ice-spear",
  title: "Ice Spear",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

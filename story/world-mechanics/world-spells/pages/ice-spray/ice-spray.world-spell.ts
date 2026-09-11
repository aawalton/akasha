import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceSpray = {
  id: "01a06572-95ca-79fb-9e45-48daee0b389f",
  type: "world-spell",
  slug: "ice-spray",
  title: "Ice Spray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

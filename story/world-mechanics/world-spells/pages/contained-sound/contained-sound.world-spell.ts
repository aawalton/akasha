import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const containedSound = {
  id: "01a06572-95ba-73f5-84ca-a0def0909c2c",
  type: "world-spell",
  slug: "contained-sound",
  title: "Contained Sound",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

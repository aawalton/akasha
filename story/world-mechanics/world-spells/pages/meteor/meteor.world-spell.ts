import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const meteor = {
  id: "01a06572-95d8-7c3a-b1da-9bda7a2953dc",
  type: "world-spell",
  slug: "meteor",
  title: "Meteor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const meteorShower = {
  id: "01a06572-95d8-7fbc-a369-d4c6d8e96866",
  type: "world-spell",
  slug: "meteor-shower",
  title: "Meteor Shower",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

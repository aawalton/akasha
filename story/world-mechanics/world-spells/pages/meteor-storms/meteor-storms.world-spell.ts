import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const meteorStorms = {
  id: "01a06572-95d8-7366-a059-2c130219eab2",
  type: "world-spell",
  slug: "meteor-storms",
  title: "Meteor Storms",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const meteorStorms = {
  id: "01a06572-95d8-7366-a059-2c130219eab2",
  type: "page-type/world-spell",
  slug: "meteor-storms",
  title: "Meteor Storms",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

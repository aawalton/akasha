import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const meteorStrike = {
  id: "01a06572-95d8-7873-b6ac-7ea03851484c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "meteor-strike",
  title: "Meteor Strike",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

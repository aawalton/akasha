import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const raiseEarthWall = {
  id: "01a06572-95dc-792f-b7d8-73cb97c24976",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "raise-earth-wall",
  title: "Raise Earth Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

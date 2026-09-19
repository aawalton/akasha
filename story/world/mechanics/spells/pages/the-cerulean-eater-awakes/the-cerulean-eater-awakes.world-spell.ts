import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const theCeruleanEaterAwakes = {
  id: "01a06572-95e6-7bc8-b060-7d82aa990515",
  type: "page-type/world-spell",
  slug: "the-cerulean-eater-awakes",
  title: "The Cerulean Eater Awakes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

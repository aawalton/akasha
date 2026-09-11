import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const batSEars = {
  id: "01a06572-95b5-7fcf-a679-0613de9b2ffc",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "bat-s-ears",
  title: "Bat’s Ears",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

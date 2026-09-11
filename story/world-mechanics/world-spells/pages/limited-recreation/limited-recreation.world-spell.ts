import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const limitedRecreation = {
  id: "01a06572-95d0-7f07-bc26-c2973c6e4473",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "limited-recreation",
  title: "Limited Recreation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

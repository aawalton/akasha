import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const theTanglingVine = {
  id: "01a06572-95e6-72cf-9958-4c375d2f4d65",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "the-tangling-vine",
  title: "The Tangling Vine",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

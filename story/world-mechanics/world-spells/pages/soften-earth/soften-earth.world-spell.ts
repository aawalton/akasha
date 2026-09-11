import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const softenEarth = {
  id: "01a06572-95e1-71e0-ab9d-df9773917f2a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "soften-earth",
  title: "Soften Earth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

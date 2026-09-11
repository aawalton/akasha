import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fissure = {
  id: "01a06572-95c3-741f-85f6-4b03a5ca76b6",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "fissure",
  title: "Fissure",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

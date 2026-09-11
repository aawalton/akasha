import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const featherfall = {
  id: "01a06572-95c0-77d6-90b8-329556563912",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "featherfall",
  title: "Featherfall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

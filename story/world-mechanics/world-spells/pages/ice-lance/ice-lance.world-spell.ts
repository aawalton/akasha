import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceLance = {
  id: "01a06572-95c9-7762-8cfd-3399d4c74370",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ice-lance",
  title: "Ice Lance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

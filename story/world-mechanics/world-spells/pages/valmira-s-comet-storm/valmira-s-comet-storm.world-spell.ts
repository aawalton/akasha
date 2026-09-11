import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const valmiraSCometStorm = {
  id: "01a06572-95e8-7204-87f0-d263fe74722b",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "valmira-s-comet-storm",
  title: "Valmira’s Comet Storm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const identifyMagicElements = {
  id: "01a06572-95cb-72cf-b1b6-c51ac2f8d3bf",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "identify-magic-elements",
  title: "Identify Magic: Elements",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

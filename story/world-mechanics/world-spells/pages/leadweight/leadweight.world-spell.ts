import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const leadweight = {
  id: "01a06572-95cc-7824-af82-b3c20eb6c646",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "leadweight",
  title: "Leadweight",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

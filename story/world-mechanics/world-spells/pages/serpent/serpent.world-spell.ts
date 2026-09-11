import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const serpent = {
  id: "01a06572-95df-7292-96ad-ff80fbc0ec1c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "serpent",
  title: "Serpent",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

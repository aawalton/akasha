import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spiritwrathOrb = {
  id: "01a06572-95e2-7ab6-a261-7d63d96224c9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "spiritwrath-orb",
  title: "Spiritwrath Orb",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

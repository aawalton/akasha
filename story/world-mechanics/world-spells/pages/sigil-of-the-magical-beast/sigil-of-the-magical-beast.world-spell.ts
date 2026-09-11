import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const sigilOfTheMagicalBeast = {
  id: "01a06572-95e0-796a-940f-0eeceac41ee2",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "sigil-of-the-magical-beast",
  title: "Sigil of the Magical Beast",
  world: "the-wandering-inn",
} as const satisfies WorldSpell

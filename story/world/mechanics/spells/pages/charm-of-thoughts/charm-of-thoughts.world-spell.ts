import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const charmOfThoughts = {
  id: "01a06572-95b8-7a65-8379-ebe926d9e3a1",
  type: "page-type/world-spell",
  slug: "charm-of-thoughts",
  title: "Charm of Thoughts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

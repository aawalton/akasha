import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spellshield = {
  id: "01a06572-95e2-7130-bf27-8bda785487b7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "spellshield",
  title: "Spellshield",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

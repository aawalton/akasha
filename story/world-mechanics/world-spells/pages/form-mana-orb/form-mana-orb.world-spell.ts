import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const formManaOrb = {
  id: "01a06572-95c5-75c0-b1f5-c5c9460a5f3e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "form-mana-orb",
  title: "Form Mana Orb",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

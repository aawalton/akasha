import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const galewinds = {
  id: "01a06572-95c6-7e46-9366-35d3ca1c3765",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "galewinds",
  title: "Galewinds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

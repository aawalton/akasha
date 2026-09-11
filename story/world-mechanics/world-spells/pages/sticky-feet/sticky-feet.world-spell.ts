import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stickyFeet = {
  id: "01a06572-95e3-7510-bcd9-29eb8c1bc8a3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "sticky-feet",
  title: "Sticky Feet",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

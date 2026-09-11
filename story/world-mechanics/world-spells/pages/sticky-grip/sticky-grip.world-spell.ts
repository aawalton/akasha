import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stickyGrip = {
  id: "01a06572-95e3-760b-b4f2-051168f9be80",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "sticky-grip",
  title: "Sticky Grip",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

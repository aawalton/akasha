import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stickyGround = {
  id: "01a06572-95e3-7d80-a1ce-55b162af3511",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "sticky-ground",
  title: "Sticky Ground",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

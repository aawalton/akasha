import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stickyWeb = {
  id: "01a06572-95e3-7a18-bb6c-f6cfed77a1c9",
  type: "world-spell",
  slug: "sticky-web",
  title: "Sticky Web",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

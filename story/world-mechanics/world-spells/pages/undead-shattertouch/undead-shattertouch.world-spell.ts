import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const undeadShattertouch = {
  id: "01a06572-95e7-7616-90f7-7baa67f0a4dd",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "undead-shattertouch",
  title: "Undead Shattertouch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

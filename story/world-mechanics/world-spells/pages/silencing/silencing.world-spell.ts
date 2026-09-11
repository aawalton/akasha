import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const silencing = {
  id: "01a06572-95e1-77bd-b640-31bb3b66f12a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "silencing",
  title: "Silencing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

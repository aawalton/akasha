import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const preservation = {
  id: "01a06572-95db-77c5-b343-22bb4aedaf57",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "preservation",
  title: "Preservation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

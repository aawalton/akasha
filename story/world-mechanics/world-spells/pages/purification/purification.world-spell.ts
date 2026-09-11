import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const purification = {
  id: "01a06572-95db-7a6a-9919-8f2db05c34f1",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "purification",
  title: "Purification",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

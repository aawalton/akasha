import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const steelArrows = {
  id: "01a06572-95e2-7cbd-9cde-fdb8a0067feb",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "steel-arrows",
  title: "Steel Arrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

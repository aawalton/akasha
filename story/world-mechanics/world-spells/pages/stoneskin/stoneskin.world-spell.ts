import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stoneskin = {
  id: "01a06572-95e4-7dd8-b640-d796f275a7d9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stoneskin",
  title: "Stoneskin",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

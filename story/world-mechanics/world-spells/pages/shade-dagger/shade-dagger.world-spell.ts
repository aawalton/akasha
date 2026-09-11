import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const shadeDagger = {
  id: "01a06572-95df-7e92-b415-f7beba89400c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "shade-dagger",
  title: "Shade Dagger",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

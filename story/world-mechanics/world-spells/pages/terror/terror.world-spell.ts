import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const terror = {
  id: "01a06572-95e6-7d59-99eb-76d8527bf68d",
  type: "world-spell",
  slug: "terror",
  title: "Terror",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magnifySpell = {
  id: "01a06572-95d1-72fd-ba43-1c8b67aed894",
  type: "page-type/world-spell",
  slug: "magnify-spell",
  title: "Magnify Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

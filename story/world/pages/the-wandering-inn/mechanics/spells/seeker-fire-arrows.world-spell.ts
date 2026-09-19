import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const seekerFireArrows = {
  id: "01a06572-95df-7250-8a2c-2399210e529e",
  type: "page-type/world-spell",
  slug: "seeker-fire-arrows",
  title: "Seeker Fire Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

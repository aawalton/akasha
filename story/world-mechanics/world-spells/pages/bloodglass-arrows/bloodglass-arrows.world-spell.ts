import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bloodglassArrows = {
  id: "01a06572-95b6-7335-914c-77c2209d8348",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "bloodglass-arrows",
  title: "Bloodglass Arrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

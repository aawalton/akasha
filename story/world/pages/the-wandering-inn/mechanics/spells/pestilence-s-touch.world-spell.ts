import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const pestilenceSTouch = {
  id: "01a06572-95da-7c8f-8ad6-c9733506d759",
  type: "page-type/world-spell",
  slug: "pestilence-s-touch",
  title: "Pestilence’s Touch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

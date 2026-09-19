import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const paleTouch = {
  id: "01a06572-95da-74b6-a9b5-700c8319427b",
  type: "page-type/world-spell",
  slug: "pale-touch",
  title: "Pale Touch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const seekingArrows = {
  id: "01a06572-95df-7827-995d-6861ca5047b4",
  type: "page-type/world-spell",
  slug: "seeking-arrows",
  title: "Seeking Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

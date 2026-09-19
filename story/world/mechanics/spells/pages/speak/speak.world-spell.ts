import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const speak = {
  id: "01a06572-95e1-70c8-b3c2-1bf696429d2a",
  type: "page-type/world-spell",
  slug: "speak",
  title: "Speak",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

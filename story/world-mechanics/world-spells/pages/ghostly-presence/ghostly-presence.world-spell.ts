import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const ghostlyPresence = {
  id: "01a06572-95c6-79fe-be78-332289fcab72",
  type: "world-spell",
  slug: "ghostly-presence",
  title: "Ghostly Presence",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

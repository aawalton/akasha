import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const roomOfParadise = {
  id: "01a06572-95de-7df1-8a07-a68d5a1b168f",
  type: "page-type/world-spell",
  slug: "room-of-paradise",
  title: "Room of Paradise",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

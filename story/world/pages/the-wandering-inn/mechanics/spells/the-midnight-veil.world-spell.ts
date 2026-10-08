import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const theMidnightVeil = {
  id: "01a06572-95e6-7f04-9076-7c8462342b74",
  type: "page-type/world-spell",
  slug: "the-midnight-veil",
  title: "The Midnight Veil",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell

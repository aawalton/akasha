import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const completeMuffle = {
  id: "01a06572-95b9-7abf-b918-4da25c2cdb2a",
  type: "page-type/world-spell",
  slug: "complete-muffle",
  title: "Complete Muffle",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.385Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

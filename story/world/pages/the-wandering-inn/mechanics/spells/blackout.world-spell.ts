import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blackout = {
  id: "01a06572-95b6-76f6-ac18-b8c6978a9058",
  type: "page-type/world-spell",
  slug: "blackout",
  title: "Blackout",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.382Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell

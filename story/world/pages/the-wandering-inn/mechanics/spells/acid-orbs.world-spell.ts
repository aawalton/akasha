import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const acidOrbs = {
  id: "01a06572-95b3-72a8-96b6-c6ffa74156a8",
  type: "page-type/world-spell",
  slug: "acid-orbs",
  title: "Acid Orbs",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.379Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell

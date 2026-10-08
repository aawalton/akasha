import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const slumber = {
  id: "01a06572-95e1-7e61-a38f-2a6a8c5e21ce",
  type: "page-type/world-spell",
  slug: "slumber",
  title: "Slumber",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

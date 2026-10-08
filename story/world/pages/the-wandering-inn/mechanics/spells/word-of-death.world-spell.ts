import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wordOfDeath = {
  id: "01a06572-95ea-7861-85e8-d8d61bb9ce07",
  type: "page-type/world-spell",
  slug: "word-of-death",
  title: "Word of Death",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.434Z",
  updatedAt: "2026-09-22T13:35:07.000Z",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const muddyGround = {
  id: "01a06572-95d9-79ee-8354-9fdf43b98619",
  type: "page-type/world-spell",
  slug: "muddy-ground",
  title: "Muddy Ground",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.417Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell

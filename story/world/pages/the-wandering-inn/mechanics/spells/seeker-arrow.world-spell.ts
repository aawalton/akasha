import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const seekerArrow = {
  id: "01a06572-95df-7faf-bb4d-1f0b6260e0bb",
  type: "page-type/world-spell",
  slug: "seeker-arrow",
  title: "Seeker Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.423Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

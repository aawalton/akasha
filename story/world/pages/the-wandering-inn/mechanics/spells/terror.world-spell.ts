import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const terror = {
  id: "01a06572-95e6-7d59-99eb-76d8527bf68d",
  type: "page-type/world-spell",
  slug: "terror",
  title: "Terror",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const paleTouch = {
  id: "01a06572-95da-74b6-a9b5-700c8319427b",
  type: "page-type/world-spell",
  slug: "pale-touch",
  title: "Pale Touch",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.418Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell

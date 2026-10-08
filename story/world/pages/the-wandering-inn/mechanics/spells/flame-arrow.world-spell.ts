import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameArrow = {
  id: "01a06572-95c3-702a-9f97-209b1c44947c",
  type: "page-type/world-spell",
  slug: "flame-arrow",
  title: "Flame Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell

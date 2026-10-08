import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameFloor = {
  id: "01a06572-95c3-716e-8892-c91cb1367de5",
  type: "page-type/world-spell",
  slug: "flame-floor",
  title: "Flame Floor",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell

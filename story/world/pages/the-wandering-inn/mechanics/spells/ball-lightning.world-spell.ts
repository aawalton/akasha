import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const ballLightning = {
  id: "01a06572-95b5-78b8-9534-3f74f0a4d7aa",
  type: "page-type/world-spell",
  slug: "ball-lightning",
  title: "Ball Lightning",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell

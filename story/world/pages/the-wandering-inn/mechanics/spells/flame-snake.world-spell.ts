import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameSnake = {
  id: "01a06572-95c3-72fa-b6c1-7ecb9227c44a",
  type: "page-type/world-spell",
  slug: "flame-snake",
  title: "Flame Snake",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightball = {
  id: "01a06572-95cf-7134-8f3e-0de7687fb0e2",
  type: "page-type/world-spell",
  slug: "lightball",
  title: "Lightball",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.407Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell

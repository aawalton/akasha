import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneDarts = {
  id: "01a06572-95e3-7351-8962-4d58eb5e6612",
  type: "page-type/world-spell",
  slug: "stone-darts",
  title: "Stone Darts",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell

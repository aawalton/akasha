import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lifeLeech = {
  id: "01a06572-95cd-7e00-b0dd-cd06086a0c44",
  type: "page-type/world-spell",
  slug: "life-leech",
  title: "Life Leech",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.405Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell

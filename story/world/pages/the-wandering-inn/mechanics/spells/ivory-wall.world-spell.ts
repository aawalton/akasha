import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const ivoryWall = {
  id: "01a06572-95cc-740a-9619-ed5225bc89eb",
  type: "page-type/world-spell",
  slug: "ivory-wall",
  title: "Ivory Wall",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.404Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell

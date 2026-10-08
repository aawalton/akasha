import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fear = {
  id: "01a06572-95c0-7ab6-82f4-a27a69351712",
  type: "page-type/world-spell",
  slug: "fear",
  title: "Fear",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.392Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell

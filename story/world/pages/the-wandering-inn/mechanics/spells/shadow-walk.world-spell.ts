import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shadowWalk = {
  id: "01a06572-95df-7243-a442-23a8f127d5eb",
  type: "page-type/world-spell",
  slug: "shadow-walk",
  title: "Shadow Walk",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.423Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const franticMarching = {
  id: "01a06572-95c5-70e5-9eac-55172d6fbea6",
  type: "page-type/world-spell",
  slug: "frantic-marching",
  title: "Frantic Marching",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell

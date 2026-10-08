import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const unlock = {
  id: "01a06572-95e8-7496-828c-2d878c612abd",
  type: "page-type/world-spell",
  slug: "unlock",
  title: "Unlock",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell

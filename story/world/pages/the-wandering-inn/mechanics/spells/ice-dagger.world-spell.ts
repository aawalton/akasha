import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceDagger = {
  id: "01a06572-95c9-73d8-bf99-cfcb59686d7a",
  type: "page-type/world-spell",
  slug: "ice-dagger",
  title: "Ice Dagger",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.401Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell

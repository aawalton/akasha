import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const barrierOfTheDamned = {
  id: "01a06572-95b5-73da-a345-2604d35f3220",
  type: "page-type/world-spell",
  slug: "barrier-of-the-damned",
  title: "Barrier of the Damned",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell

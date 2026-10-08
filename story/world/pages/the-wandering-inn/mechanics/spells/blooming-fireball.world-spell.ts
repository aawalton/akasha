import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bloomingFireball = {
  id: "01a06572-95b6-7a72-a32b-d5b8454b4bb6",
  type: "page-type/world-spell",
  slug: "blooming-fireball",
  title: "Blooming Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.382Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell

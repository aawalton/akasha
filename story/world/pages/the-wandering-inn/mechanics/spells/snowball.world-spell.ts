import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const snowball = {
  id: "01a06572-95e1-7ff6-86a7-b42e6d6118a1",
  type: "page-type/world-spell",
  slug: "snowball",
  title: "Snowball",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

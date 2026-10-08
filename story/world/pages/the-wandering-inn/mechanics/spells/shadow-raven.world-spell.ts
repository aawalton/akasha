import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shadowRaven = {
  id: "01a06572-95df-7b31-aae2-e546816b55eb",
  type: "page-type/world-spell",
  slug: "shadow-raven",
  title: "Shadow Raven",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.423Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

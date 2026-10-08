import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shadowDoppelganger = {
  id: "01a06572-95df-736c-8900-2d9d8e5edb9e",
  type: "page-type/world-spell",
  slug: "shadow-doppelganger",
  title: "Shadow Doppelganger",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.423Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

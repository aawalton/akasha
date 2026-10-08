import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const theTanglingVine = {
  id: "01a06572-95e6-72cf-9958-4c375d2f4d65",
  type: "page-type/world-spell",
  slug: "the-tangling-vine",
  title: "The Tangling Vine",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell

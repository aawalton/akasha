import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const seeHeat = {
  id: "01a06572-95df-7219-87b8-e1ac26ca9c0a",
  type: "page-type/world-spell",
  slug: "see-heat",
  title: "See Heat",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.423Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

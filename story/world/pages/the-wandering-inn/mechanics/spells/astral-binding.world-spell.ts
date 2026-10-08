import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const astralBinding = {
  id: "01a06572-95b5-73bf-8c5d-05e82efbd217",
  type: "page-type/world-spell",
  slug: "astral-binding",
  title: "Astral Binding",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.381Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell

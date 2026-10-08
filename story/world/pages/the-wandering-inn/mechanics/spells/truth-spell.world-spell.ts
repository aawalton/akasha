import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const truthSpell = {
  id: "01a06572-95e7-7a80-a3a7-46d7eace80bd",
  type: "page-type/world-spell",
  slug: "truth-spell",
  title: "Truth Spell",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell

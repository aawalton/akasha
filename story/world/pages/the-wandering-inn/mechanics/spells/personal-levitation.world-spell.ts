import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const personalLevitation = {
  id: "01a06572-95da-78d2-a1f4-5e8af47e4f53",
  type: "page-type/world-spell",
  slug: "personal-levitation",
  title: "Personal Levitation",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.418Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell

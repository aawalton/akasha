import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sproutwoodCurse = {
  id: "01a06572-95e2-763e-ad74-94f4be0dcd69",
  type: "page-type/world-spell",
  slug: "sproutwood-curse",
  title: "Sproutwood Curse",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

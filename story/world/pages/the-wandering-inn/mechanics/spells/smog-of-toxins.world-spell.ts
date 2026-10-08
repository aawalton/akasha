import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const smogOfToxins = {
  id: "01a06572-95e1-7ae1-9c8b-b6af8a98cd9f",
  type: "page-type/world-spell",
  slug: "smog-of-toxins",
  title: "Smog of Toxins",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

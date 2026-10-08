import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellward = {
  id: "01a06572-95e2-7b54-9974-489a94c6696c",
  type: "page-type/world-spell",
  slug: "spellward",
  title: "Spellward",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

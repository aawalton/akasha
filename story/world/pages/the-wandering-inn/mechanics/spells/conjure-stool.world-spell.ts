import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const conjureStool = {
  id: "01a06572-95ba-71e1-8b20-de08b68c4c89",
  type: "page-type/world-spell",
  slug: "conjure-stool",
  title: "Conjure Stool",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.386Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

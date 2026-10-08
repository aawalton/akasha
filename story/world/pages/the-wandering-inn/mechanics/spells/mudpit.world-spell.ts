import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mudpit = {
  id: "01a06572-95d9-7a71-9b7b-086c1c4669f2",
  type: "page-type/world-spell",
  slug: "mudpit",
  title: "Mudpit",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.417Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell

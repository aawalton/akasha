import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shockOrb = {
  id: "01a06572-95e0-7a37-9377-47379f631487",
  type: "page-type/world-spell",
  slug: "shock-orb",
  title: "Shock Orb",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.424Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

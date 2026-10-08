import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const voltOrb = {
  id: "01a06572-95e8-7cfd-8dbd-b556faaf6238",
  type: "page-type/world-spell",
  slug: "volt-orb",
  title: "Volt Orb",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell

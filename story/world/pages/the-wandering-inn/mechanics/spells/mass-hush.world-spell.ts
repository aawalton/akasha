import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massHush = {
  id: "01a06572-95d2-7352-8257-5e596c93c268",
  type: "page-type/world-spell",
  slug: "mass-hush",
  title: "Mass Hush",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.410Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell

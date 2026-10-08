import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massSilence = {
  id: "01a06572-95d2-7918-9f39-e9859e86f4c4",
  type: "page-type/world-spell",
  slug: "mass-silence",
  title: "Mass Silence",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.410Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell

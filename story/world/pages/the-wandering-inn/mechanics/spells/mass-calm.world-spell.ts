import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massCalm = {
  id: "01a06572-95d1-75bc-a1c5-d95e3c703e36",
  type: "page-type/world-spell",
  slug: "mass-calm",
  title: "Mass Calm",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfFire = {
  id: "01a06572-95e8-7321-a3ad-af1357ac46db",
  type: "page-type/world-spell",
  slug: "wall-of-fire",
  title: "Wall of Fire",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell

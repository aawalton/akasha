import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massInvisibility = {
  id: "01a06572-95d2-7103-a831-72539c3f5ff4",
  type: "page-type/world-spell",
  slug: "mass-invisibility",
  title: "Mass Invisibility",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.410Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell

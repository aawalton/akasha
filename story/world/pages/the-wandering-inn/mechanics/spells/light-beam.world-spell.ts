import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightBeam = {
  id: "01a06572-95ce-73b8-8f84-317061612465",
  type: "page-type/world-spell",
  slug: "light-beam",
  title: "Light Beam",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.406Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell

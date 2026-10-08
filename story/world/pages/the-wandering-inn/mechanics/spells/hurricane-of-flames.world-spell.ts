import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const hurricaneOfFlames = {
  id: "01a06572-95c9-77c3-806d-355728e9db95",
  type: "page-type/world-spell",
  slug: "hurricane-of-flames",
  title: "Hurricane of Flames",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.401Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell

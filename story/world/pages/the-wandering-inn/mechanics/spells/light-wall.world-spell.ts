import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightWall = {
  id: "01a06572-95ce-717a-88bf-834d8608c14e",
  type: "page-type/world-spell",
  slug: "light-wall",
  title: "Light Wall",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.406Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell

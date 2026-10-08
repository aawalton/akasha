import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightbridge = {
  id: "01a06572-95cf-7d6d-b2aa-9a20d7ce9037",
  type: "page-type/world-spell",
  slug: "lightbridge",
  title: "Lightbridge",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.407Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthenSpire = {
  id: "01a06572-95bf-7c69-85c3-1e57fcfc2a69",
  type: "page-type/world-spell",
  slug: "earthen-spire",
  title: "Earthen Spire",
  world: "world/the-wandering-inn",
  appearanceCount: 12,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

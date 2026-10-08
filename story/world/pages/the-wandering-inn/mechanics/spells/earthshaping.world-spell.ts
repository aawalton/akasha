import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthshaping = {
  id: "01a06572-95bf-7e6c-916d-e9fe8e7622fc",
  type: "page-type/world-spell",
  slug: "earthshaping",
  title: "Earthshaping",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

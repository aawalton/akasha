import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const containedRoom = {
  id: "01a06572-95ba-7ecd-8088-3b27626417bb",
  type: "page-type/world-spell",
  slug: "contained-room",
  title: "Contained Room",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.386Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

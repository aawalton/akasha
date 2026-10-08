import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthenSpires = {
  id: "01a06572-95bf-735f-bbc0-582516f6ed40",
  type: "page-type/world-spell",
  slug: "earthen-spires",
  title: "Earthen Spires",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

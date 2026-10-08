import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthenPillars = {
  id: "01a06572-95be-7f38-af51-f0bc226acc8e",
  type: "page-type/world-spell",
  slug: "earthen-pillars",
  title: "Earthen Pillars",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthenFloor = {
  id: "01a06572-95be-7972-b40b-b4403690029a",
  type: "page-type/world-spell",
  slug: "earthen-floor",
  title: "Earthen Floor",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const domeOfHeat = {
  id: "01a06572-95be-75db-925e-c066f20cd7db",
  type: "page-type/world-spell",
  slug: "dome-of-heat",
  title: "Dome of Heat",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell

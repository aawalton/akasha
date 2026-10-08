import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const siegeFireballs = {
  id: "01a06572-95e0-704f-a66f-37cb581369b2",
  type: "page-type/world-spell",
  slug: "siege-fireballs",
  title: "Siege Fireballs",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.424Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const siegeFireball = {
  id: "01a06572-95e0-7cc4-86bc-934ca19701a1",
  type: "page-type/world-spell",
  slug: "siege-fireball",
  title: "Siege Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 42,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.424Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell

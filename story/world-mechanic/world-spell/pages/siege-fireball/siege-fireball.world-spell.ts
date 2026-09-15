import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const siegeFireball = {
  id: "01a06572-95e0-7cc4-86bc-934ca19701a1",
  type: "world-spell",
  slug: "siege-fireball",
  title: "Siege Fireball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

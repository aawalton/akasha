import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const siegeFireballs = {
  id: "01a06572-95e0-704f-a66f-37cb581369b2",
  type: "page-type/world-spell",
  slug: "siege-fireballs",
  title: "Siege Fireballs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

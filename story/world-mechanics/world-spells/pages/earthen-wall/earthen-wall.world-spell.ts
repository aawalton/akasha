import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const earthenWall = {
  id: "01a06572-95bf-71b2-96eb-0047c04dc4a6",
  type: "world-spell",
  slug: "earthen-wall",
  title: "Earthen Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

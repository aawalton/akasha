import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const windOrb = {
  id: "01a06572-95ea-7c47-8574-82f72c01929d",
  type: "page-type/world-spell",
  slug: "wind-orb",
  title: "Wind Orb",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

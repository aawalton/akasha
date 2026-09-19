import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boostedVelocity = {
  id: "01a06572-95b7-7735-8d3c-8312cf5e87ae",
  type: "page-type/world-spell",
  slug: "boosted-velocity",
  title: "Boosted Velocity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

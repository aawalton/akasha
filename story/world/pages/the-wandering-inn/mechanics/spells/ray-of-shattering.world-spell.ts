import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rayOfShattering = {
  id: "01a06572-95dc-7b1e-a649-35593cfc275f",
  type: "page-type/world-spell",
  slug: "ray-of-shattering",
  title: "Ray of Shattering",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

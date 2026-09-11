import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const smokescreen = {
  id: "01a06572-95e1-7849-a41d-141f64d629bf",
  type: "world-spell",
  slug: "smokescreen",
  title: "Smokescreen",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

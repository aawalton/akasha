import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const detectDeath = {
  id: "01a06572-95bc-749f-9b8c-378c2d597e86",
  type: "world-spell",
  slug: "detect-death",
  title: "Detect Death",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

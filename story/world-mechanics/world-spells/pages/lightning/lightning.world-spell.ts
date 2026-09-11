import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightning = {
  id: "01a06572-95d0-70ed-922f-2c0138482917",
  type: "world-spell",
  slug: "lightning",
  title: "Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

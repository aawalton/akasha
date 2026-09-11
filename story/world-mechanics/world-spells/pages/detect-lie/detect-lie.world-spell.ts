import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const detectLie = {
  id: "01a06572-95bc-7ecc-b7d4-1dbc586d5758",
  type: "world-spell",
  slug: "detect-lie",
  title: "Detect Lie",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

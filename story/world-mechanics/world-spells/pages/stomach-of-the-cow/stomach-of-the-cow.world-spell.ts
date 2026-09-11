import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stomachOfTheCow = {
  id: "01a06572-95e3-7bce-95ad-192cd11e2c29",
  type: "world-spell",
  slug: "stomach-of-the-cow",
  title: "Stomach of the Cow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const pentagramOfTheFiveAlchemies = {
  id: "01a06572-95da-744a-99d7-9c389b78f43a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "pentagram-of-the-five-alchemies",
  title: "Pentagram of the Five Alchemies",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const handOfTheGaleElemental = {
  id: "01a06572-95c8-7d81-a003-6c22d2cff9f9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "hand-of-the-gale-elemental",
  title: "Hand of the Gale Elemental",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

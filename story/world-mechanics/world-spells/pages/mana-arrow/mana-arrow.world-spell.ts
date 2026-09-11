import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const manaArrow = {
  id: "01a06572-95d1-7e49-8c49-305f704d1923",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mana-arrow",
  title: "Mana Arrow",
  world: "the-wandering-inn",
  evolvesToSlugs: ["mana-bullet"],
  references: "jsonl",
} as const satisfies WorldSpell

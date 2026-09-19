import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const manaArrow = {
  id: "01a06572-95d1-7e49-8c49-305f704d1923",
  type: "page-type/world-spell",
  slug: "mana-arrow",
  title: "Mana Arrow",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["mana-bullet"],
  references: "jsonl",
} as const satisfies WorldSpell

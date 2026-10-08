import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const manaArrow = {
  id: "01a06572-95d1-7e49-8c49-305f704d1923",
  type: "page-type/world-spell",
  slug: "mana-arrow",
  title: "Mana Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesToSlugs: ["world-spell/mana-bullet"],
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSpell

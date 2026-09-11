import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const healWounds = {
  id: "01a06572-95c8-73db-a02a-a7a648852100",
  type: "world-spell",
  slug: "heal-wounds",
  title: "Heal Wounds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

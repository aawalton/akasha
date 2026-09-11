import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const greaterHealWounds = {
  id: "01a06572-95c7-7870-9002-f4098aa7e303",
  type: "world-spell",
  slug: "greater-heal-wounds",
  title: "Greater Heal Wounds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

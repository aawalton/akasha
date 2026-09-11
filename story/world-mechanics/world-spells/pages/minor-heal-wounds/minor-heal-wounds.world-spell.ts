import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const minorHealWounds = {
  id: "01a06572-95d9-780f-94d1-151a2e3d12a7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "minor-heal-wounds",
  title: "Minor Heal Wounds",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

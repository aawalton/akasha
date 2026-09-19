import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const minorHealWounds = {
  id: "01a06572-95d9-780f-94d1-151a2e3d12a7",
  type: "page-type/world-spell",
  slug: "minor-heal-wounds",
  title: "Minor Heal Wounds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const massCorpseDetonation = {
  id: "01a06572-95d1-75ec-a0dd-154d55bcbd60",
  type: "world-spell",
  slug: "mass-corpse-detonation",
  title: "Mass Corpse Detonation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

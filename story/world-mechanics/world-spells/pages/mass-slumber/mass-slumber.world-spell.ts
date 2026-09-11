import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const massSlumber = {
  id: "01a06572-95d2-7cc3-a2d2-ca8bbea8ec12",
  type: "world-spell",
  slug: "mass-slumber",
  title: "Mass Slumber",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const massDispelMagic = {
  id: "01a06572-95d1-790b-9778-68240f701125",
  type: "world-spell",
  slug: "mass-dispel-magic",
  title: "Mass Dispel Magic",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massSpellTransmuteAirToWater = {
  id: "01a06572-95d2-75b6-9967-16997cfd67c9",
  type: "page-type/world-spell",
  slug: "mass-spell-transmute-air-to-water",
  title: "Mass Spell: Transmute Air to Water",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell

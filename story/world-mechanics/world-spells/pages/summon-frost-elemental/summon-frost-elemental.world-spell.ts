import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const summonFrostElemental = {
  id: "01a06572-95e4-7033-9564-1440ee560e27",
  type: "world-spell",
  slug: "summon-frost-elemental",
  title: "Summon Frost Elemental",
  world: "the-wandering-inn",
} as const satisfies WorldSpell

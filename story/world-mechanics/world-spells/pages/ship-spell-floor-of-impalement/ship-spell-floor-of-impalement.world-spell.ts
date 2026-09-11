import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const shipSpellFloorOfImpalement = {
  id: "01a06572-95e0-735c-a0b6-e4c64e247ae3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ship-spell-floor-of-impalement",
  title: "Ship Spell: Floor of Impalement",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
